import { busOperatorEntity } from "src/apis/busOperator/entities/busOperator.entity";
import { baseEntity } from "src/common/base/entities/base.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { SchedulesEntity } from "../../busOperator/entities/schedule.entity";

@Entity('buses')
export class BusEntity extends baseEntity {

    @Column({ type: 'smallint' })
    totalSeats: number;

    @Column({ type: 'smallint' })
    numberFloor: number;

    @Column({ type: 'enum', enum: ['AC', 'NON-AC'], default: 'NON-AC' })
    busType: string;

    @ManyToOne(() => busOperatorEntity, busOperator => busOperator.bus)
    busOperator: busOperatorEntity;

    @ManyToMany(() => SchedulesEntity, schedule => schedule.bus)
    @JoinColumn({ name: 'bus_schedule' })
    schedule: SchedulesEntity[];

}