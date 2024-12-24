import { baseEntity } from "src/common/base/entities/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { ReservationEntity } from "./reservation.entity";
import { SeatEntity } from "src/apis/busOperator/entities/seat.entity";

@Entity('reservation-details')
export class ReservationDetailEntity extends baseEntity {
    @ManyToOne(() => ReservationEntity, reservation => reservation.reservationDetail)
    reservation: ReservationEntity;

    @ManyToOne(() => SeatEntity, seat => seat.reservationDetail)
    seat: SeatEntity;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;
}