import { IBusOperator } from "src/apis/busOperator/interfaces/busOperator.interface";
import { ISeat } from "./seat.interface";
import { ISchedule } from "./schedule.interface";
import { IBaseInterface } from "src/common/base/interfaces/base.interface";

export interface IBus extends IBaseInterface {
    totalSeats: number;
    number_floor: number;
    busOperator?: IBusOperator;
    seat?: ISeat[];
    schedule?: ISchedule[];
}
