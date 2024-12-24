import { IBaseInterface } from "src/common/base/interfaces/base.interface";
import { IBus } from "./bus.interface";
import { IRoute } from "src/apis/routes/interfaces/route.interface";
import { IBusOperator } from "src/apis/busOperator/interfaces/busOperator.interface";

export interface ISchedule extends IBaseInterface {
    route: IRoute[];
    bus: IBus[];
    departureDate: Date;
    departureTime: Date;
    status: string;
    busOperator: IBusOperator;
}