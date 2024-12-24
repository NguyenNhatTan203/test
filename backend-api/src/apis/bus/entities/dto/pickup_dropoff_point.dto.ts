// import { IsNotEmpty, IsOptional, IsString } from "class-validator";

// export class PickupDropoffPointDto {
//     @IsOptional()
//     route: string;

//     @Column({ type: 'varchar', length: 50 })
//     province: string;

//     @Column({ type: 'varchar', length: 50 })
//     district: string;

//     @Column({ type: 'varchar', length: 50 })
//     commune: string;

//     @Column({ type: 'varchar', length: 255 })
//     address_detail: string;

//     @Column({
//         type: 'enum',
//         enum: Object.values(TYPE_PICKUP_DROP_OFF)
//     })
//     type: string;

//     @Column({
//         type: 'enum',
//         enum: Object.values(STATUS),
//         default: STATUS.ACTIVE
//     })
//     status: string;
// }