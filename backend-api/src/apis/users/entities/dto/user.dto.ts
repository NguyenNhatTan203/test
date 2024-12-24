import { IsString, IsEmail, IsDate, IsNotEmpty, IsOptional, IsUUID, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(1, 25)
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 25)
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 15)
    phone: string;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    birthday: Date;


    @IsOptional()
    @IsUUID()
    role: string;

}
