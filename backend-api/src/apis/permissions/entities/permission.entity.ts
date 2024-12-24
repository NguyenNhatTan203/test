import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { RoleEntity } from '../../roles/entities/role.entity';
import { PERMISSION_ENUM } from 'src/common/constant/user.enum';
import { baseEntity } from 'src/common/base/entities/base.entity';

@Entity('permissions')
export class PermissionEntity extends baseEntity {

    @Column({
        type: 'enum',
        enum: Object.values(PERMISSION_ENUM),
    })
    name: PERMISSION_ENUM;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToMany(() => RoleEntity, (role) => role.permissions)
    roles: RoleEntity[];
}
