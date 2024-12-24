import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository, } from 'typeorm';
import { busOperatorEntity } from './entities/busOperator.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import _ from 'lodash';
import { AddressEntity } from './entities/address.entity';
import { UsersService } from '../users/users.service';
import { getAddressSelectFields, getBusOperatorSelectFields, getUserSelectFields } from 'src/common/utils/select-builder.util';
import { CreateScheduleDto, ImportScheduleDto, IScheduleDto } from './entities/dto/schedule.dto';
import { SchedulesEntity } from './entities/schedule.entity';
import { QueryParamsDto } from '../../common/base/entities/dto/queryParams.dto';
import { CreateAddressDto, CreateBusOperatorDto, UpdateBusOperatorDto } from './entities/dto/busOperator.dto';
import { RoutesEntity } from '../routes/entities/route.entity';
import { paginate } from 'src/common/function-helper/pagination';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { IAddress } from './interfaces/address.interface';


@Injectable()
export class BusOperatorService {
    private readonly logger = new Logger(BusOperatorService.name);
    constructor(
        @InjectRepository(AddressEntity)
        private readonly addressRepository: Repository<AddressEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(busOperatorEntity)
        private readonly busOperatorRepository: Repository<busOperatorEntity>,
        @InjectRepository(RoutesEntity)
        private readonly routeRepository: Repository<RoutesEntity>,
        @InjectRepository(SchedulesEntity)
        private readonly scheduleRepository: Repository<SchedulesEntity>,

        private readonly userService: UsersService,
    ) { }
    async create(createBusOperatorDto: CreateBusOperatorDto) {
        const { addresses } = createBusOperatorDto;

        const newAddresses = await Promise.all(
            addresses.map(async (address) => {
                return this.addressRepository.save(address);
            })
        );

        const newBusOperator = this.busOperatorRepository.create({
            ...createBusOperatorDto,
            addresses: newAddresses,
        });

        return await this.busOperatorRepository.save(newBusOperator);
    }


    async addAddressToBusOperator(slug: string, address: CreateAddressDto) {
        const busOperator = await this.busOperatorRepository.findOne({
            where: { slug },
            relations: ['addresses'],
        });
        if (!busOperator) {
            throw new NotFoundException('BUS_OPERATOR_NOT_FOUND');
        }
        const newAddress = await this.addressRepository.save(address);

        busOperator.addresses = [...busOperator.addresses, newAddress];
        return await this.busOperatorRepository.save(busOperator);
    }

    async addUserToBusOperator(slug: string, userId: string) {
        const busOperator = await this.busOperatorRepository.findOne({
            where: { slug },
            relations: ['users'],
        });
        if (!busOperator) {
            throw new NotFoundException('BUS_OPERATOR_NOT_FOUND');
        }

        if (_.find(busOperator.users, { _id: userId })) {
            throw new NotFoundException('USER_ALREADY_ADDED');
        }

        const user = await this.userRepository.findOne({
            where: { _id: userId },
        });
        if (!user) {
            throw new NotFoundException('USER_NOT_FOUND');
        }

        busOperator.users = [...busOperator.users, user];
        return await this.busOperatorRepository.save(busOperator);
    }



    async createBusOperatorSchedule(slug: string, createScheduleDtos: CreateScheduleDto[]) {
        const busOperator = await this.busOperatorRepository.findOne({
            where: { slug },
            relations: ['schedules', 'users', 'bus'],
        });

        if (!busOperator) {
            throw new NotFoundException('BUS_OPERATOR_NOT_FOUND');
        }

        const allNewSchedules = [];

        for (const createScheduleDto of createScheduleDtos) {
            const foundRoute = await this.routeRepository.findOne({
                where: { _id: String(createScheduleDto.route) },
            });

            if (!foundRoute) {
                throw new NotFoundException(`ROUTE_NOT_FOUND: ${createScheduleDto.route}`);
            }

            const newSchedules = await Promise.all(
                createScheduleDto.schedules.map(async (scheduleData) => {
                    const { departureDate, departureTime, status } = scheduleData;

                    const newSchedule = this.scheduleRepository.create({
                        route: foundRoute,
                        busOperator,
                        departureDate,
                        departureTime,
                        status,
                    });

                    return newSchedule;
                })
            );

            const savedSchedules = await this.scheduleRepository.save(newSchedules);
            allNewSchedules.push(...savedSchedules);
        }

        busOperator.schedules = [...(busOperator.schedules || []), ...allNewSchedules];

        return await this.busOperatorRepository.save(busOperator);
    }

    async getBusOperatorSchedules(slug: string, queryParams: QueryParamsDto) {
        const {
            search,
            sort,
            sortType,
            departureDate,
            departureTime,
            startPoint,
            destination,
            status,
        } = queryParams;

        const qb = this.busOperatorRepository.createQueryBuilder('busOperator')
            .leftJoin('busOperator.users', 'user')
            .leftJoinAndSelect('busOperator.schedules', 'schedule')
            .leftJoinAndSelect('schedule.route', 'route')
            .leftJoinAndSelect('busOperator.addresses', 'addresses')
            .leftJoinAndSelect('busOperator.media', 'media')
            .leftJoinAndSelect('busOperator.bus', 'bus')
            .where('busOperator.slug = :slug', { slug });

        qb.addSelect([
            ...getUserSelectFields('user'),
        ]);

        if (search) {
            qb.andWhere('route.name ILIKE :search', { search: `%${search}%` });
        }

        if (sort) {
            qb.orderBy(
                `schedule.${sort}`,
                sortType?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
            );
        }

        if (departureDate) qb.andWhere('schedule.departureDate = :departureDate', { departureDate });
        if (departureTime) qb.andWhere('schedule.departureTime = :departureTime', { departureTime });
        if (startPoint) qb.andWhere('route.startPoint = :startPoint', { startPoint });
        if (destination) qb.andWhere('route.destination = :destination', { destination });
        if (status) qb.andWhere('schedule.status = :status', { status });

        return qb.getOne();
    }

    async importBusOperatorSchedule(slug: string, file: Express.Multer.File) {
        const busOperator = await this.busOperatorRepository.findOne(
            {
                where: { slug },
                relations: ['schedules', 'users', 'bus', 'addresses'],
            }
        );
        if (!busOperator) throw new NotFoundException('BUS_OPERATOR_NOT_FOUND');

        const columnMapping = {
            'departureDate': 'Departure Date',
            'departureTime': 'Departure Time',
            'status': 'Status',
            'route': 'Route ID',
        };

        const normalizeColumnName = (columnName: string) => {
            return columnName
                .trim()
                .toLowerCase()
                .replace(/\s+/g, '')
                .replace(/[^\w\s]/gi, '');
        };

        const workbook = XLSX.readFile(file.path);
        const data: ImportScheduleDto[] = [];

        workbook.SheetNames.forEach((sheetName) => {
            const sheet = workbook.Sheets[sheetName];
            const rawRows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            if (rawRows.length === 0) return;

            let headers: string[] = [];

            // Locate headers in the rows
            for (let i = 0; i < rawRows.length; i++) {
                headers = rawRows[i] as string[];

                if (headers.some(header => Object.values(columnMapping).includes(header))) {
                    break;
                }
            }

            if (headers.length === 0) return;

            const columnIndexMap: { [key: string]: number } = {};

            headers.forEach((header, index) => {
                const normalizedHeader = normalizeColumnName(header);

                for (const key in columnMapping) {
                    if (normalizeColumnName(columnMapping[key]) === normalizedHeader) {
                        columnIndexMap[key] = index;
                    }
                }
            });

            const rows = rawRows.slice(headers.length);

            rows.forEach((row) => {
                const mappedRow: any = {};

                for (const key in columnIndexMap) {
                    const columnIndex = columnIndexMap[key];
                    const cellValue = row[columnIndex];

                    if (key === 'departureDate' && cellValue) {
                        // Convert Excel date (serial number or string) to a JS Date
                        if (typeof cellValue === 'number') {
                            mappedRow[key] = new Date((cellValue - 25569) * 86400 * 1000);
                        } else {
                            mappedRow[key] = new Date(cellValue);
                        }
                    } else if (key === 'departureTime' && cellValue) {
                        // Convert Excel time (fractional days or string) to a JS Date
                        if (typeof cellValue === 'number') {
                            const time = new Date((cellValue * 86400 * 1000) % 86400000);
                            mappedRow[key] = time.toISOString().split('T')[1];
                        } else {
                            mappedRow[key] = new Date(`1970-01-01T${cellValue}`).toISOString().split('T')[1];
                        }
                    } else if (key === 'status' && cellValue) {
                        mappedRow[key] = cellValue.trim().toLowerCase();
                    } else {
                        mappedRow[key] = cellValue;
                    }
                }

                data.push(mappedRow);
            });
        });

        if (file.path) {
            fs.unlink(file.path, (err) => {
                if (err) {
                    this.logger.error('Error deleting the file', err);
                } else {
                    this.logger.log(`File ${file.path} deleted successfully`);
                }
            });
        }

        const newSchedules = await Promise.all(
            data.map(async (scheduleData) => {
                const { route, ...schedule } = scheduleData;

                const foundRoute = await this.routeRepository.findOne({
                    where: { _id: route },
                });
                if (!foundRoute) throw new NotFoundException(`ROUTE_NOT_FOUND: ${route}`);

                const newSchedule = this.scheduleRepository.create({
                    route: foundRoute,
                    ...schedule,
                });

                return newSchedule;
            })
        );



        const savedSchedules = await this.scheduleRepository.save(newSchedules);
        busOperator.schedules = [...(busOperator.schedules || []), ...savedSchedules];
        return await this.busOperatorRepository.save(busOperator);
    }

    async getBusOperators(queryParams: QueryParamsDto) {
        const {
            search,
            sort,
            sortType,
            departureDate,
            departureTime,
            destination,
            startPoint,
            status,
            routeId,
            page = 1,
            pageSize = 10
        } = queryParams;

        const qb = this.busOperatorRepository.createQueryBuilder('busOperator')
            .leftJoin('busOperator.users', 'user')
            .leftJoinAndSelect('busOperator.schedules', 'schedule')
            .leftJoinAndSelect('schedule.route', 'route')
            .leftJoinAndSelect('busOperator.addresses', 'addresses')
            .leftJoinAndSelect('busOperator.media', 'media')
            .leftJoinAndSelect('busOperator.bus', 'bus')
            .addSelect([...getUserSelectFields('user')]);

        // Initialize filters as an empty array
        const filters: { query: string; params: Record<string, any> }[] = [];

        // Add filters conditionally
        if (routeId) filters.push({ query: 'route._id = :routeId', params: { routeId } });
        if (search) filters.push({ query: 'busOperator.name ILIKE :search', params: { search: `%${search}%` } });
        if (departureDate) filters.push({ query: 'schedule.departureDate = :departureDate', params: { departureDate } });
        if (departureTime) filters.push({ query: 'schedule.departureTime = :departureTime', params: { departureTime } });
        if (startPoint) filters.push({ query: 'route.startPoint = :startPoint', params: { startPoint } });
        if (destination) filters.push({ query: 'route.destination = :destination', params: { destination } });
        if (status) filters.push({ query: 'schedule.status = :status', params: { status } });

        // Apply all filters to the query builder
        filters.forEach(filter => qb.andWhere(filter.query, filter.params));

        // Apply sorting
        if (sort) {
            const order = sortType?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
            qb.orderBy(`schedule.${sort}`, order);
        }

        // Paginate results
        return paginate(qb, page, pageSize);
    }

    async updateBusOperator(slug: string, updateBusOperatorDto: UpdateBusOperatorDto) {
        const { busOperator, addresses, schedules } = updateBusOperatorDto;

        const foundBusOperator = await this.busOperatorRepository.findOne({
            where: { slug },
            relations: ['addresses', 'users', 'schedules', 'bus'],
        });

        if (!foundBusOperator) throw new NotFoundException('BUS_OPERATOR_NOT_FOUND');

        if (addresses) {
            const updatedAddresses = await this.updateOrCreateEntities(
                addresses,
                this.updateAddress.bind(this),
                this.createAddress.bind(this)
            );

            foundBusOperator.addresses = updatedAddresses as AddressEntity[];
        }

        // Update or create schedules
        if (schedules) {
            const updatedSchedules = await Promise.all(
                schedules.map(async schedule => {
                    if (schedule._id) {
                        return this.updateSchedule(schedule);
                    }
                    return this.createSchedule(schedule);
                })
            );

            foundBusOperator.schedules = updatedSchedules as SchedulesEntity[];
        }

        // Update bus operator details
        if (busOperator) {
            Object.assign(foundBusOperator, busOperator);
        }

        await this.busOperatorRepository.save(foundBusOperator);
        return foundBusOperator;
    }

    private async updateOrCreateEntities<T>(
        entities: T[],
        updateFn: (entity: T) => Promise<T>,
        createFn: (entity: T) => Promise<T>
    ): Promise<T[]> {
        const updatedEntities = await Promise.all(
            entities.map(entity =>
                entity['_id'] ? updateFn(entity) : createFn(entity)
            )
        );
        return updatedEntities;
    }

    private async updateAddress(address: CreateAddressDto) {
        const { _id, ...addressPayload } = address;
        const foundAddress = await this.addressRepository.findOne({ where: { _id } });

        if (!foundAddress) throw new NotFoundException('ADDRESS_NOT_FOUND');

        Object.assign(foundAddress, addressPayload);
        return this.addressRepository.save(foundAddress);
    }

    private async createAddress(address: CreateAddressDto) {
        return this.addressRepository.save(address);
    }

    private async updateSchedule(schedule: IScheduleDto) {
        const { _id, ...schedulePayload } = schedule;
        const foundSchedule = await this.scheduleRepository.findOne({ where: { _id } });

        if (!foundSchedule) throw new NotFoundException('SCHEDULE_NOT_FOUND');

        Object.assign(foundSchedule, schedulePayload);
        return this.scheduleRepository.save(foundSchedule);
    }

    private async createSchedule(schedule: IScheduleDto) {
        const foundRoute = await this.routeRepository.findOne({ where: { _id: schedule.route } });

        if (!foundRoute) throw new NotFoundException('ROUTE_NOT_FOUND');

        const newSchedule = this.scheduleRepository.create({
            ...schedule,
            route: foundRoute,
        });

        return this.scheduleRepository.save(newSchedule);
    }

}

