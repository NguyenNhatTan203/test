import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaEntity } from './entities/media.entity';
import { CloudinaryProvider } from 'src/configs/cloudinary.config';
import { MulterModule } from '@nestjs/platform-express';
import { LoggingInterceptor } from 'src/cores/interceptors/logging.interceptor';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MediaEntity
    ]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    })
  ],
  controllers: [MediaController],
  providers: [
    MediaService,
    CloudinaryProvider,
    LoggingInterceptor,
  ],
  exports: [
    MediaService,
    TypeOrmModule,
    MulterModule,
  ]
})
export class MediaModule { }
