import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppRouterModule } from './routes/app.route.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig, dataSource, dbConfig } from './configs/app.config';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AppRouterModule.forRoot(),
    TypeOrmModule.forRoot(dataSource.options),
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule { }
