import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { District } from './district.entity';

@Entity('wards')
export class Ward {
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

    @ManyToOne(() => District, (district) => district.wards)
    district: District;
}
