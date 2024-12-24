import { IsString, IsNotEmpty, IsEmail, IsOptional, IsArray, ValidateNested, isPhoneNumber, IsPhoneNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { DeepPartial } from 'typeorm';
import { CreateUserDto } from 'src/apis/users/entities/dto/user.dto';
import { IBus } from 'src/apis/bus/interfaces/bus.interface';
import { IAddress } from '../../interfaces/address.interface';
import { CreateBusDto } from 'src/apis/bus/entities/dto/bus.dto';
import { IUser } from 'src/apis/users/interfaces/user.interface';
import { IRoute } from 'src/apis/routes/interfaces/route.interface';
import { ISchedule } from 'src/apis/bus/interfaces/schedule.interface';
import { CreateScheduleDto, IScheduleDto } from './schedule.dto';

export class CreateAddressDto {
    @IsOptional()
    @IsString()
    _id: string;

    @IsNotEmpty()
    @IsString()
    province: string;

    @IsNotEmpty()
    @IsString()
    district: string;

    @IsNotEmpty()
    @IsString()
    commune: string;

    @IsNotEmpty()
    @IsString()
    addressDetail: string;
}

export class CreateBusOperatorDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    // @IsPhoneNumber()
    phone: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAddressDto)
    addresses: DeepPartial<CreateAddressDto>[];
}

export class BusOperatorDto {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    phone: string;

    @IsOptional()
    media: any;

}

export class UpdateBusOperatorDto {
    @IsOptional()
    busOperator: BusOperatorDto;

    @IsOptional()
    @IsArray()
    addresses: CreateAddressDto[];

    @IsOptional()
    @IsArray()
    users: any[];

    @IsOptional()
    @IsArray()
    bus: any[];

    @IsOptional()
    @IsArray()
    schedules: IScheduleDto[];
}
