import { baseEntity } from "src/common/base/entities/base.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { SchedulesEntity } from "../../busOperator/entities/schedule.entity";

@Entity('routes')
export class RoutesEntity extends baseEntity {

    @Column({ type: 'varchar', length: 100 })
    startPoint: string;

    @Column({ type: 'varchar', length: 100 })
    destination: string;

    @OneToMany(() => SchedulesEntity, schedule => schedule.route)
    schedule: SchedulesEntity[];

}