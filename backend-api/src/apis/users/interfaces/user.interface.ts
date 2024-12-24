import { IBusOperator } from "src/apis/busOperator/interfaces/busOperator.interface";
import { IRole } from "src/apis/roles/interfaces/role.interface";
import { IBaseInterface } from "src/common/base/interfaces/base.interface";

export interface IUser extends IBaseInterface {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password?: string;
    birthday: Date;
    role: IRole;
    company: IBusOperator;
    status: string;
    isGoogle: boolean;
    isFacebook: boolean;
    fullName: string;
}