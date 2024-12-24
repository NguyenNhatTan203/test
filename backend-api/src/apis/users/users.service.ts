import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import _ from 'lodash';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
    ) { }

    async findOne(email: string) {
        return await this.usersRepository.findOne(
            {
                where: { email },
                relations: ['role'],
            }
        )
    }

    async findById(_id: string) {
        const user = await this.usersRepository.findOne({ where: { _id } });
        return _.omit(user, ['password']);
    }
}
