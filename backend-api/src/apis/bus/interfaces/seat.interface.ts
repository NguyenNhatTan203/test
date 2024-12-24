import { IBaseInterface } from "src/common/base/interfaces/base.interface";
import { IBus } from "./bus.interface";

export interface ISeat extends IBaseInterface {
    bus: IBus;
    seat_number: string;
    status: string;
    floor: number;
}