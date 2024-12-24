import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { District } from './district.entity';

@Entity('provinces')
export class Province {
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
    phoneCode: string;

    @OneToMany(() => District, (district) => district.province)
    districts: District[];
}
