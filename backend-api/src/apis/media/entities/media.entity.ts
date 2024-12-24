import { busOperatorEntity } from 'src/apis/busOperator/entities/busOperator.entity';
import { baseEntity } from 'src/common/base/entities/base.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('media')
export class MediaEntity extends baseEntity {

    @Column({ type: 'varchar', nullable: true })
    asset_id: string;

    @Column({ type: 'varchar', nullable: true })
    public_id: string;

    @Column({ type: 'bigint', nullable: true })
    version: number;

    @Column({ type: 'varchar', nullable: true })
    version_id: string;

    @Column({ type: 'varchar', nullable: true })
    signature: string;

    @Column({ type: 'int', nullable: true })
    width: number;

    @Column({ type: 'int', nullable: true })
    height: number;

    @Column({ type: 'varchar', nullable: true })
    format: string;

    @Column({ type: 'varchar', nullable: true })
    resource_type: string;

    @Column({ type: 'simple-array', nullable: true })
    tags: string[];

    @Column({ type: 'int', nullable: true })
    pages: number;

    @Column({ type: 'bigint', nullable: true })
    bytes: number;

    @Column({ type: 'varchar', nullable: true })
    type: string;

    @Column({ type: 'varchar', nullable: true })
    etag: string;

    @Column({ type: 'boolean', default: false })
    placeholder: boolean;

    @Column({ type: 'varchar', nullable: true })
    url: string;

    @Column({ type: 'varchar', nullable: true })
    secure_url: string;

    @Column({ type: 'varchar', nullable: true })
    asset_folder: string;

    @Column({ type: 'varchar', nullable: true })
    display_name: string;

    @Column({ type: 'varchar', nullable: true })
    original_filename: string;

    @ManyToOne(() => busOperatorEntity, busOperator => busOperator.media)
    busOperator: busOperatorEntity;

}
