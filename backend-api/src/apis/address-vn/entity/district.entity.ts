import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Province } from './province.entity';
import { Ward } from './ward.entity';

@Entity('districts')
export class District {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column()
    codename: string;

    @Column()
    divisionType: string;

    @Column()
    shortCodename: string;

    @ManyToOne(() => Province, (province) => province.districts)
    province: Province;

    @OneToMany(() => Ward, (ward) => ward.district)
    wards: Ward[];
}
