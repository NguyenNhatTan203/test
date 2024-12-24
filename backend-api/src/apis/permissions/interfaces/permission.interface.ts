import { IRole } from "src/apis/roles/interfaces/role.interface";
import { IBaseInterface } from "src/common/base/interfaces/base.interface";

export interface IPermission extends IBaseInterface {
    name: string;
    description: string;
    roles: IRole[];
}