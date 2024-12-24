import { Module } from '@nestjs/common';
import { BusOperatorService } from './busOperator.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { busOperatorEntity } from './entities/busOperator.entity';
import { UserEntity } from '../users/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { AddressEntity } from './entities/address.entity';
import { UsersModule } from '../users/users.module';
import { SchedulesEntity } from './entities/schedule.entity';
import { BusOperatorController } from './busOperator.controller';
import { RoutesModule } from '../routes/routes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      busOperatorEntity,
      UserEntity,
      AddressEntity,
      SchedulesEntity,

    ]),
    AuthModule,
    UsersModule,
    RoutesModule,
  ],
  controllers: [BusOperatorController],
  providers: [
    BusOperatorService,
  ],
  exports: [
    BusOperatorService,
    TypeOrmModule
  ],
})
export class BusOperatorModule { }
