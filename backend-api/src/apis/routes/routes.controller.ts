import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './entities/dto/route.dto';
import { QueryParamsDto } from 'src/common/base/entities/dto/queryParams.dto';

@Controller('routes')
export class RoutesController {
    constructor(
        private readonly routesService: RoutesService
    ) { }

    @Post()
    async create(
        @Body() createRouteDto: CreateRouteDto
    ) {
        return this.routesService.create(createRouteDto);
    }

    @Get()
    async getRoute(
        @Query() queryParams: QueryParamsDto
    ) {
        return this.routesService.getRoute(queryParams);
    }

    @Get('all')
    async getAllRoute() {
        return this.routesService.getAllRoute();
    }

}
