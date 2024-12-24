import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateScheduleDto } from "src/apis/busOperator/entities/dto/schedule.dto";
import { DeepPartial } from "typeorm";

export class CreateRouteDto {
    @IsNotEmpty()
    startPoint: string;

    @IsNotEmpty()
    destination: string;

}
