import { IsNotEmpty, IsNumber } from "class-validator";
import { IBusOperator } from "src/apis/busOperator/interfaces/busOperator.interface";
import { DeepPartial } from "typeorm";

export class CreateBusDto {

    @IsNotEmpty()
    @IsNumber()
    totalSeats: number;

    @IsNotEmpty()
    @IsNumber()
    number_floor: number;

    @IsNotEmpty()
    company: DeepPartial<IBusOperator>;

    @IsNotEmpty()
    seat: any[];


    // schedule: Schedules[];

}
