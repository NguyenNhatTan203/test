import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { busOperatorEntity } from "./busOperator.entity";
import { baseEntity } from "src/common/base/entities/base.entity";

@Entity('addresses')
export class AddressEntity extends baseEntity {

    @Column({ type: 'varchar', length: 35 })
    province: string;

    @Column({ type: 'varchar', length: 35 })
    district: string;

    @Column({ type: 'varchar', length: 35 })
    commune: string;

    @Column({ type: 'varchar', length: 255 })
    addressDetail: string;

    @ManyToOne(() => busOperatorEntity, (busOperator) => busOperator.addresses, { nullable: true })
    busOperator: busOperatorEntity
}
