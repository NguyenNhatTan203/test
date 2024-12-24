import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/apis/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/cores/strategy/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConfig } from 'src/configs/app.config';
import { JwtStrategy } from 'src/cores/strategy/jwt.strategy';
import { GoogleStrategy } from 'src/cores/strategy/google.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: { expiresIn: jwtConfig.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy
  ],
  exports: [AuthService],
})
export class AuthModule { }

