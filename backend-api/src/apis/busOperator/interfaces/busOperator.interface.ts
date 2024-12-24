import { IUser } from "src/apis/users/interfaces/user.interface";
import { IAddress } from "./address.interface";
import { IBus } from "src/apis/bus/interfaces/bus.interface";
import { IBaseInterface } from "src/common/base/interfaces/base.interface";
import { IRoute } from "src/apis/routes/interfaces/route.interface";

export interface IBusOperator extends IBaseInterface {
    name: string;
    slug?: string;
    email: string;
    address?: IAddress[];
    phone: string;
    users?: IUser[];
    routes?: IRoute[];
    bus?: IBus;
}