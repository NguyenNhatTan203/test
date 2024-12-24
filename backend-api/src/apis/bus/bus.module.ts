import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickupDropoffPoint } from '../busOperator/entities/pickup_dropoff_point.entity';
import { SeatEntity } from '../busOperator/entities/seat.entity';
import { BusEntity } from './entities/bus.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            BusEntity,
            PickupDropoffPoint,
            SeatEntity,
        ])
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class BusModule {

}
