import { IsDate, IsEnum, IsNotEmpty, IsArray, ArrayNotEmpty, ValidateNested, IsString, IsOptional } from "class-validator";
import { Transform, Type } from "class-transformer";
import { SCHEDULE } from "src/common/constant/company.enum";
import { IRoute } from "src/apis/routes/interfaces/route.interface";

// Define the individual schedule structure
class ScheduleDto {
    @IsNotEmpty()
    @Transform(({ value }) => {
        // Convert Excel serial number to JavaScript Date
        if (typeof value === 'number' && !isNaN(value)) {
            return new Date((value - 25569) * 86400 * 1000); // Excel date to JS date
        }
        return new Date(value); // If it's already a Date or string, no conversion needed
    })
    @IsDate()
    departureDate: Date;

    @IsNotEmpty()
    @Transform(({ value }) => {
        // Convert Excel time to JavaScript Date
        if (typeof value === 'number' && !isNaN(value)) {
            return new Date(value * 86400 * 1000); // Excel time to JS date
        }
        return new Date(value); // If it's already a Date or string, no conversion needed
    })
    @IsDate()
    departureTime: Date;

    @IsOptional()
    @IsEnum(Object.values(SCHEDULE.STATUS))
    status: string;
}


export class CreateScheduleDto {

    @IsNotEmpty()
    route: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ScheduleDto)
    schedules: ScheduleDto[];
}

export class ImportScheduleDto {
    @IsNotEmpty()
    @IsString()
    route: string;

    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => ScheduleDto)
    schedule: ScheduleDto;
}

export class IScheduleDto {
    @IsOptional()
    @IsString()
    route: string;

    @IsOptional()
    _id: string;

    @IsOptional()
    @IsDate()
    departureDate: Date;

    @IsOptional()
    @IsDate()
    departureTime: Date;

    @IsOptional()
    @IsEnum(Object.values(SCHEDULE.STATUS))
    status: string;

}
