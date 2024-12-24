import { IPermission } from "src/apis/permissions/interfaces/permission.interface";
import { IUser } from "src/apis/users/interfaces/user.interface";
import { IBaseInterface } from "src/common/base/interfaces/base.interface";

export interface IRole extends IBaseInterface {
    name: string;
    description: string;
    users: IUser[];
    permissions: IPermission[];
}