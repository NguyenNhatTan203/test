import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { PermissionEntity } from "../../permissions/entities/permission.entity";
import { ROLE_ENUM } from "src/common/constant/user.enum";
import { baseEntity } from "src/common/base/entities/base.entity";

@Entity('roles')
export class RoleEntity extends baseEntity {

    @Column({
        type: 'enum',
        enum: ROLE_ENUM,
        default: ROLE_ENUM.CUSTOMER,
    })
    name: ROLE_ENUM;

    @Column({ type: 'text' })
    description: string;

    @OneToMany(() => UserEntity, (user) => user.role)
    users: UserEntity[];

    @ManyToMany(() => PermissionEntity, (permission) => permission.roles)
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {
            name: 'role_id',
            referencedColumnName: '_id',
        },
        inverseJoinColumn: {
            name: 'permission_id',
            referencedColumnName: '_id',
        },
    })
    permissions: PermissionEntity[];
}
