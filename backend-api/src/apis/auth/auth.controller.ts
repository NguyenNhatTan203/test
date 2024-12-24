import { Body, Controller, Get, Param, Post, UseGuards, Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LANGUAGE } from 'src/common/constant/language.enum';
import { CreateUserDto } from 'src/apis/users/entities/dto/user.dto';
import { LocalAuthGuard } from 'src/cores/guards/local-auth.guard';
import { JwtAuthGuard, Public } from 'src/cores/guards/jwt-auth.guard';
import { GoogleAuthGuard } from 'src/cores/guards/google.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Post('register')
    async register(
        @Body() user: CreateUserDto,
        @Param('locale') locale: string = LANGUAGE.VI,
    ) {
        return await this.authService.register(user, locale);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Param('locale') locale: string = LANGUAGE.VI,
        @Request() req: any,
    ) {
        return await this.authService.login(req, locale);
    }


    @Post('refresh-token')
    async refreshToken(
        @Body('refresh_token') refreshToken: string,
        @Param('locale') locale: string = LANGUAGE.VI,
    ) {
        return await this.authService.refreshToken(refreshToken, locale);
    }

    @Get('google')
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {
        // Google sẽ tự động redirect đến Google Login
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    googleAuthRedirect(@Req() req) {
        // Khi Google trả về callback
        return {
            message: 'Google authentication successful',
            user: req.user,
        };
    }

    @Get('profile')
    async getProfile(@Request() req) {
        const userId = 'a16c676e-ddc2-40a5-888e-5f0ce31d81f7';
        return await this.authService.profile(userId);
    }

}
