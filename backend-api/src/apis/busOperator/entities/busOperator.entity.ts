import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, JoinColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import slugify from 'slugify';
import { UserEntity } from 'src/apis/users/entities/user.entity';
import { AddressEntity } from './address.entity';
import { baseEntity } from 'src/common/base/entities/base.entity';
import { RoutesEntity } from '../../routes/entities/route.entity';
import { BusEntity } from '../../bus/entities/bus.entity';
import { MediaEntity } from 'src/apis/media/entities/media.entity';
import { SchedulesEntity } from './schedule.entity';

@Entity('busOperators')
export class busOperatorEntity extends baseEntity {
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    slug: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @OneToMany(() => AddressEntity, (address) => address.busOperator, { nullable: true })
    addresses: AddressEntity[];

    @Column({ type: 'varchar', length: 20 })
    phone: string;

    @OneToMany(() => MediaEntity, (media) => media.busOperator, { nullable: true })
    media: MediaEntity[];

    @OneToMany(() => UserEntity, (user) => user.busOperator, { nullable: true })
    users: UserEntity[];

    @OneToMany(() => BusEntity, bus => bus.busOperator)
    bus: BusEntity[];

    @OneToMany(() => SchedulesEntity, schedule => schedule.busOperator, { nullable: true })
    schedules: SchedulesEntity[];

    @BeforeInsert()
    generateSlug(): void {
        this.slug = slugify(this.name, { lower: true, strict: true }) + '-' + new Date().getTime();
    }

}
