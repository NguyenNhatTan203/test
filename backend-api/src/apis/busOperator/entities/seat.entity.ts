import { baseEntity } from "src/common/base/entities/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BusEntity } from "../../bus/entities/bus.entity";
import { SEAT_STATUS } from "src/common/constant/company.enum";
import { SchedulesEntity } from "src/apis/busOperator/entities/schedule.entity";
import { ReservationDetailEntity } from "src/apis/reservations/entities/reservation-detail.entity";

@Entity('seats')
export class SeatEntity extends baseEntity {
    @ManyToOne(() => SchedulesEntity, schedule => schedule.seat)
    schedule: SchedulesEntity;

    @OneToMany(() => ReservationDetailEntity, reservationDetail => reservationDetail.seat)
    reservationDetail: ReservationDetailEntity[];

    @Column({ type: 'varchar', length: 10 })
    seatNumber: string;

    @Column({
        type: 'enum', enum: Object.values(SEAT_STATUS),
        default: SEAT_STATUS.AVAILABLE
    })
    status: string;

    @Column({ type: 'smallint' })
    floor: number;

}