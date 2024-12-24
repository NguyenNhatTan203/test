import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appConfig } from './configs/app.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './cores/interceptors/logging.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['log', 'error', 'warn', 'debug', 'verbose'] });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  app.useGlobalInterceptors(new LoggingInterceptor());
  Logger.overrideLogger(['log', 'error', 'warn', 'debug', 'verbose']);

  app.setGlobalPrefix(`api`);

  // const config = new DocumentBuilder()
  //   .setTitle('Cats example')
  //   .setDescription('The cats API description')
  //   .setVersion('1.0')
  //   .addTag('cats')
  //   .build();
  // const documentFactory = () => SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, documentFactory);
  app.useLogger(new Logger());
  await app.listen(appConfig.port, '0.0.0.0');
  console.log(await app.getUrl());

}
bootstrap();
