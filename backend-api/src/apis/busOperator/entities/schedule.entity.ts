import { baseEntity } from "src/common/base/entities/base.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { RoutesEntity } from "../../routes/entities/route.entity";
import { busOperatorEntity } from "./busOperator.entity";
import { SCHEDULE } from "src/common/constant/company.enum";
import { BusEntity } from "../../bus/entities/bus.entity";
import { SeatEntity } from "src/apis/busOperator/entities/seat.entity";
import { ReservationEntity } from "src/apis/reservations/entities/reservation.entity";

@Entity('schedules')
export class SchedulesEntity extends baseEntity {

    @OneToMany(() => SeatEntity, seat => seat.schedule)
    seat: SeatEntity[];

    @ManyToOne(() => RoutesEntity, route => route.schedule)
    route: RoutesEntity

    @ManyToMany(() => BusEntity, bus => bus.schedule)
    bus: BusEntity[];

    @ManyToOne(() => busOperatorEntity, busOperator => busOperator.schedules)
    busOperator: busOperatorEntity;

    @OneToMany(() => ReservationEntity, reservation => reservation.schedule)
    reservation: ReservationEntity[];

    @Column({ type: 'date' })
    departureDate: Date;

    @Column({ type: 'time' })
    departureTime: Date;

    @Column({ type: 'enum', enum: Object.values(SCHEDULE.STATUS), default: SCHEDULE.STATUS.ACTIVE })
    status: string;

}