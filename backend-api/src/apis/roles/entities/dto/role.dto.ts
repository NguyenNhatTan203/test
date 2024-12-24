import { IsEnum, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { ROLE_ENUM } from 'src/common/constant/user.enum';

export class CreateRoleDto {
    @IsEnum(ROLE_ENUM, { message: 'Role name must be a valid value from ROLE_ENUM' })
    name: ROLE_ENUM;

    @IsString()
    @Length(1, 255, { message: 'Description must be between 1 and 255 characters long' })
    description: string;

    @IsUUID('all', { each: true, message: 'Each permission ID must be a valid UUID' })
    @IsOptional()
    permissions?: string[];
}

export class UpdateRoleDto {
    @IsOptional()
    @IsEnum(ROLE_ENUM, { message: 'Role name must be a valid value from ROLE_ENUM' })
    name?: ROLE_ENUM;

    @IsOptional()
    @IsString()
    @Length(1, 255, { message: 'Description must be between 1 and 255 characters long' })
    description?: string;

    @IsOptional()
    @IsUUID('all', { each: true, message: 'Each permission ID must be a valid UUID' })
    permissions?: string[]; // Array of permission IDs
}

export class RoleResponseDto {
    @IsUUID()
    id: string;

    @IsEnum(ROLE_ENUM)
    name: ROLE_ENUM;

    @IsString()
    description: string;

    permissions: { id: string; name: string }[];

    created_at: Date;
    updated_at: Date;
}
