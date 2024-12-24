import { IBaseInterface } from "src/common/base/interfaces/base.interface";
import { IBusOperator } from "./busOperator.interface";

export interface IAddress extends IBaseInterface {
    province: string;
    district: string;
    commune: string;
    addressDetail: string;
    busOperator?: IBusOperator
}