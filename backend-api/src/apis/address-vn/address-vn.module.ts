import { Module } from '@nestjs/common';
import { AddressVnController } from './address-vn.controller';
import { AddressVnService } from './address-vn.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from './entity/province.entity';
import { Ward } from './entity/ward.entity';
import { District } from './entity/district.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Province,
      Ward,
      District
    ])
  ],
  controllers: [AddressVnController],
  providers: [AddressVnService],
  exports: [
    AddressVnService,
    TypeOrmModule
  ]
})
export class AddressVnModule { }
