import { IPickupDropoffPoint } from "src/apis/bus/interfaces/pickup_dropoff_point.interface";
import { IBaseInterface } from "src/common/base/interfaces/base.interface";
import { ISchedule } from "src/apis/bus/interfaces/schedule.interface";
import { IBusOperator } from "src/apis/busOperator/interfaces/busOperator.interface";

export interface IRoute extends IBaseInterface {
    start_point: string;
    destination: string;
    company: IBusOperator;
    schedule?: ISchedule[];
    pickupDropoffPoint?: IPickupDropoffPoint[];
}