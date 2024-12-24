import { IRoute } from "src/apis/routes/interfaces/route.interface";
import { IBaseInterface } from "src/common/base/interfaces/base.interface";

export interface IPickupDropoffPoint extends IBaseInterface {
    route: IRoute;
    province: string;
    district: string;
    commune: string;
    address_detail: string;
    type: string;
    status: string;
}