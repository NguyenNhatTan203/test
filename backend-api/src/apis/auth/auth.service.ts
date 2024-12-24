import { BadRequestException, Injectable, LoggerService, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppError } from 'src/cores/errors/app-error.error';
import { MessageResponse, messages } from 'src/configs/message.config';
import { StatusCodes } from 'http-status-codes';
import * as bcrypt from 'bcrypt';
import _ from 'lodash';
import { UserEntity } from 'src/apis/users/entities/user.entity';
import { CreateUserDto } from 'src/apis/users/entities/dto/user.dto';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/configs/app.config';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly usersRepository: Repository<UserEntity>,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async register(user: CreateUserDto, locale: string) {
        const {
            email, phone, password,
        } = user;

        const userExited = await this.usersRepository.findOne({
            where: [
                { email: email },
                { phone: phone },
            ],
        });
        if (userExited) {
            throw new BadRequestException(MessageResponse(messages.USER_EXISTED, locale));
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await this.usersRepository.save({
            ...user,
            password: hashPassword,
            role: user.role as any,
        });

        return _.omit(newUser, ['password']);
    }


    async login(req: any, locale: string) {
        const user = req.user;
        const cleanUser = _.omit(user, ['password', 'phone', 'email']);
        const payload: TokenPayloadDto = {
            user: cleanUser,
        };
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.sign(payload, { secret: jwtConfig.secret, expiresIn: jwtConfig.expiresIn }),
            this.jwtService.sign(payload, { secret: jwtConfig.secret, expiresIn: jwtConfig.refreshExpiresIn }),
        ]);

        return {
            access_token,
            refresh_token,
            user: cleanUser,
            mesage: MessageResponse(messages.LOGIN, locale),
        }
    }

    async refreshToken(refreshToken: string, locale: string) {

        const verifyToken = this.jwtService.verify(refreshToken, { secret: jwtConfig.secret });
        if (!verifyToken) {
            throw new UnauthorizedException(MessageResponse(messages.INVALID_TOKEN, locale));
        }

        const payload = verifyToken.user;
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.sign(payload, { secret: jwtConfig.secret, expiresIn: jwtConfig.expiresIn }),
            this.jwtService.sign(payload, { secret: jwtConfig.secret, expiresIn: jwtConfig.refreshExpiresIn }),
        ]);

        return {
            access_token,
            refresh_token,
        }
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        const isMatch = await bcrypt.compare(password, user.password);
        if (user && isMatch) {
            return _.omit(user, ['password']);
        }
        return null;
    }

    async handleGoogleLogin(profile: any) {

        const existingUser = await this.usersService.findOne(profile.email);
        if (existingUser) {
            await this.usersRepository.update(
                { email: profile.email },
                { isGoogle: true }
            );

            const cleanUser = _.omit(existingUser, ['password']);
            const [access_token, refresh_token] = await Promise.all([
                this.jwtService.sign(cleanUser, { secret: jwtConfig.secret, expiresIn: jwtConfig.expiresIn }),
                this.jwtService.sign(cleanUser, { secret: jwtConfig.secret, expiresIn: jwtConfig.refreshExpiresIn }),
            ]);
            return { access_token, refresh_token, user: cleanUser };
        } else {
            const newUser = await this.usersRepository.save({
                email: profile.email,
                first_name: profile.firstName,
                last_name: profile.lastName,
                full_name: profile.fullName,
                isGoogle: true,
            });

            const cleanUser = _.omit(newUser, ['password']);
            const [access_token, refresh_token] = await Promise.all([
                this.jwtService.sign(cleanUser, { secret: jwtConfig.secret, expiresIn: jwtConfig.expiresIn }),
                this.jwtService.sign(cleanUser, { secret: jwtConfig.secret, expiresIn: jwtConfig.refreshExpiresIn }),
            ]);
            return { access_token, refresh_token, user: cleanUser };
        }
    }

    async profile(userId: any) {
        return await this.usersRepository.findOne({
            where: { _id: userId },
        });
    }


}


