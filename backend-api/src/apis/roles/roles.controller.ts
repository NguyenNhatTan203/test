import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoleDto } from './entities/dto/role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(
        private readonly rolesService: RolesService
    ) { }
    @Post()
    async create(
        @Body() createRoleDto: CreateRoleDto
    ) {
        return await this.rolesService.create(createRoleDto);
    }
}
