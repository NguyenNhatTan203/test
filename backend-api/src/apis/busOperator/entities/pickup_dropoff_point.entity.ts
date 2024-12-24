import { RoutesEntity } from "src/apis/routes/entities/route.entity";
import { baseEntity } from "src/common/base/entities/base.entity";
import { STATUS, TYPE_PICKUP_DROP_OFF } from "src/common/constant/company.enum";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity('pickup_dropoff_points')
export class PickupDropoffPoint extends baseEntity {

    @Column({ type: 'varchar', length: 50 })
    province: string;

    @Column({ type: 'varchar', length: 50 })
    district: string;

    @Column({ type: 'varchar', length: 50 })
    commune: string;

    @Column({ type: 'varchar', length: 255 })
    addressDetail: string;

    @Column({
        type: 'enum',
        enum: Object.values(TYPE_PICKUP_DROP_OFF)
    })
    type: string;

    @Column({
        type: 'enum',
        enum: Object.values(STATUS),
        default: STATUS.ACTIVE
    })
    status: string;
}