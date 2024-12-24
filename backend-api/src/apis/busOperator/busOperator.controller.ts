import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Query, UploadedFile } from '@nestjs/common';
import { BusOperatorService } from './busOperator.service';
import { CreateUserDto } from '../users/entities/dto/user.dto';
import { IUser } from '../users/interfaces/user.interface';
import { CreateScheduleDto, ImportScheduleDto } from './entities/dto/schedule.dto';
import { QueryParamsDto } from '../../common/base/entities/dto/queryParams.dto';
import { CreateRouteDto } from '../routes/entities/dto/route.dto';
import { CreateAddressDto, CreateBusOperatorDto, UpdateBusOperatorDto } from './entities/dto/busOperator.dto';
import { FileUploadInterceptor } from 'src/cores/decorators/FileUploadInterceptor.decorator';
import { TYPE_FILE } from 'src/common/constant/type_file.enum';
import * as XLSX from 'xlsx';


@Controller('bus-operator')
export class BusOperatorController {
    constructor(
        private readonly busOperatorService: BusOperatorService,
    ) { }

    @Post()
    async createCompany(
        @Body() createBusOperatorDto: CreateBusOperatorDto,
    ) {
        return this.busOperatorService.create(createBusOperatorDto);
    }

    @Get('/:slug')
    async getBusOperatorDetail(
        @Param('slug') slug: string,
        @Query() queryParams: QueryParamsDto,
    ) {
        return this.busOperatorService.getBusOperatorSchedules(slug, queryParams);
    }

    @Post('/:slug/add-address')
    async addAddressToBusOperator(
        @Body() address: CreateAddressDto,
        @Param('slug') slug: string,
    ) {
        return this.busOperatorService.addAddressToBusOperator(slug, address);
    }

    @Post('/:slug/add-user')
    async addUserToBusOperator(
        @Body('userId') userId: string,
        @Param('slug') slug: string,
    ) {
        return this.busOperatorService.addUserToBusOperator(slug, userId);
    }

    @Post('/:slug/create-schedule')
    async createBusOperatorSchedule(
        @Body() createScheduleDto: CreateScheduleDto[],
        @Param('slug') slug: string,
    ) {
        return this.busOperatorService.createBusOperatorSchedule(slug, createScheduleDto);
    }

    @Post('/:slug/import-schedule')
    @FileUploadInterceptor(TYPE_FILE.DOCUMENT)
    async uploadSingle(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 50 * 1024 * 1024 }),
                    new FileTypeValidator({ fileType: /application\/(vnd.openxmlformats-officedocument.spreadsheetml.sheet|vnd.ms-excel)/ }),
                ],
            }),
        )
        file: Express.Multer.File,
        @Param('slug') slug: string,
    ) {
        return await this.busOperatorService.importBusOperatorSchedule(slug, file);
    }

    @Get()
    async getBusOperators(
        @Query() queryParams: QueryParamsDto,
    ) {
        return this.busOperatorService.getBusOperators(queryParams);
    }

    @Put('/:slug')
    async updateBusOperator(
        @Body() updateBusOperatorDto: UpdateBusOperatorDto,
        @Param('slug') slug: string,
    ) {
        return this.busOperatorService.updateBusOperator(slug, updateBusOperatorDto);
    }
}

