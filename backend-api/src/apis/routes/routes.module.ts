import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesEntity } from './entities/route.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoutesEntity])
  ],
  controllers: [RoutesController],
  providers: [
    RoutesService,
  ],
  exports: [
    RoutesService,
    TypeOrmModule,
  ],
})
export class RoutesModule { }
