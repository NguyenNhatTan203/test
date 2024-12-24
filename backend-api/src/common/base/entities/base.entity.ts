import { Column, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';
import { DateTime } from 'luxon';

export class baseEntity {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

}
