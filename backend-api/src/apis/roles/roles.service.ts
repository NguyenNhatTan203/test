import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './entities/dto/role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>
    ) { }

    async create(
        createRoleDto: CreateRoleDto
    ) {
        const { name, description } = createRoleDto;
        return await this.roleRepository.save(
            {
                name,
                description
            }
        );
    }
}
