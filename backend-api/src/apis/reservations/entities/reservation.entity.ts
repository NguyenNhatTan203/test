import { baseEntity } from "src/common/base/entities/base.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ReservationDetailEntity } from "./reservation-detail.entity";
import { SeatEntity } from "src/apis/busOperator/entities/seat.entity";
import { SchedulesEntity } from "src/apis/busOperator/entities/schedule.entity";
import { UserEntity } from "src/apis/users/entities/user.entity";

@Entity('reservations')
export class ReservationEntity extends baseEntity {
    @OneToMany(() => ReservationDetailEntity, reservationDetail => reservationDetail.reservation)
    reservationDetail: ReservationDetailEntity[];

    @ManyToOne(() => SchedulesEntity, schedule => schedule.reservation)
    schedule: SchedulesEntity;

    @ManyToOne(() => UserEntity, user => user.reservation)
    user: UserEntity | null;

    @Column({ type: 'varchar', length: 35, nullable: true })
    firstName: string;

    @Column({ type: 'varchar', length: 35, nullable: true })
    lastName: string;

    @Column({ type: 'varchar', length: 15, nullable: true })
    phone: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    reservationTime: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalPrice: number;

    @Column({ type: 'enum', enum: ['PENDING', 'PAID'], default: 'PENDING' })
    status: string;
}