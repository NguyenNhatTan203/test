import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BeforeInsert, AfterLoad, OneToMany } from 'typeorm';
import { RoleEntity } from '../../roles/entities/role.entity';
import { USER_STATUS } from 'src/common/constant/user.enum';
import { baseEntity } from 'src/common/base/entities/base.entity';
import { busOperatorEntity } from 'src/apis/busOperator/entities/busOperator.entity';
import { ReservationEntity } from 'src/apis/reservations/entities/reservation.entity';

@Entity('users')
export class UserEntity extends baseEntity {

    @Column({ type: 'varchar', length: 25 })
    firstName: string;

    @Column({ type: 'varchar', length: 25 })
    lastName: string;

    @Column({ type: 'varchar', length: 15 })
    phone: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'date' })
    birthday: Date;

    @ManyToOne(() => RoleEntity, (role) => role.users, { nullable: true })
    role: RoleEntity | null;

    @ManyToOne(() => busOperatorEntity, (busOperator) => busOperator.users, { nullable: true })
    busOperator: busOperatorEntity;

    @OneToMany(() => ReservationEntity, reservation => reservation.user)
    reservation: ReservationEntity[];

    @Column({
        type: 'enum',
        enum: USER_STATUS,
        default: USER_STATUS.ACTIVE,
    })
    status: USER_STATUS;

    @Column({ type: 'boolean', default: false })
    isGoogle: boolean;

    @Column({ type: 'boolean', default: false })
    isFacebook: boolean;



    get fullName(): string {
        return `${this.firstName} ${this.lastName}`.trim();
    }
}
