import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './entities/dto/route.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoutesEntity } from './entities/route.entity';
import { QueryParamsDto } from '../../common/base/entities/dto/queryParams.dto';
import { Repository } from 'typeorm';
import { paginate } from 'src/common/function-helper/pagination';

@Injectable()
export class RoutesService {
    constructor(
        @InjectRepository(RoutesEntity)
        private readonly routesRepository: Repository<RoutesEntity>
    ) { }

    async create(createRouteDto: CreateRouteDto) {
        return this.routesRepository.save(createRouteDto);
    }

    async getRoute(queryParams: QueryParamsDto) {
        const {
            page = 1,
            pageSize = 10,
            startPoint,
            destination,
            departureDate,
            search,
            sort,
            sortType
        } = queryParams;
        const qb = this.routesRepository.createQueryBuilder('routes')
            .innerJoinAndSelect('routes.schedule', 'schedule')
            .leftJoinAndSelect('schedule.busOperator', 'busOperator')


        const filters: { query: string; params: Record<string, any> }[] = [];
        if (search) {
            filters.push({
                query: `routes.startPoint LIKE :search OR routes.destination LIKE :search`,
                params: { search: `%${search}%` }
            });
        }
        if (startPoint) {
            filters.push({
                query: `routes.startPoint = :startPoint`,
                params: { startPoint }
            });
        }
        if (destination) {
            filters.push({
                query: `routes.destination = :destination`,
                params: { destination }
            });
        }
        if (departureDate) {
            filters.push({
                query: `schedule.departureDate = :departureDate`,
                params: { departureDate }
            });
        }
        if (sort) {
            const order = sortType?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
            qb.orderBy(`schedule.${sort}`, order);
        }

        filters.forEach(({ query, params }) => {
            qb.andWhere(query, params);
        });

        return await paginate(qb, page, pageSize);
    }

    async getAllRoute() {
        return this.routesRepository.find();
    }
}
