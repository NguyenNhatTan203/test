import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { googleConfig, jwtConfig } from 'src/configs/app.config';
import { AuthService } from 'src/apis/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly authService: AuthService,
        private readonly jwtService: JwtService,
    ) {
        super({
            clientID: googleConfig.clientID,
            clientSecret: googleConfig.clientSecret,
            callbackURL: googleConfig.callbackURL,
            scope: [
                'email',
                'profile',
                'https://www.googleapis.com/auth/user.birthday.read',
                'https://www.googleapis.com/auth/contacts.readonly',
            ],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { family_name, given_name, name, email, picture } = profile._json;

        let birthday = null;
        let phoneNumber = null;

        try {
            const peopleResponse = await fetch('https://people.googleapis.com/v1/people/me?personFields=birthdays,phoneNumbers', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (peopleResponse.ok) {
                const peopleData = await peopleResponse.json();
                console.log("🚀 ~ GoogleStrategy ~ validate ~ peopleData:", peopleData);

                // Extract birthday if available
                if (peopleData.birthdays && peopleData.birthdays.length > 0) {
                    const birthdayData = peopleData.birthdays[0].date;
                    birthday = `${birthdayData.year || ''}-${birthdayData.month || ''}-${birthdayData.day || ''}`;
                }

                // Extract phone number if available
                if (peopleData.phoneNumbers && peopleData.phoneNumbers.length > 0) {
                    phoneNumber = peopleData.phoneNumbers[0].value;
                }
            } else {
                console.error(`Failed to fetch data: ${peopleResponse.status} ${peopleResponse.statusText}`);
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }

        const user = {
            email,
            firstName: given_name || '',
            lastName: family_name || '',
            fullName: name || '',
            picture: picture || '',
            birthday: birthday || null,
            phoneNumber: phoneNumber || null,
        };

        console.log("🚀 ~ GoogleStrategy ~ validate ~ user:", user);

        const handleGoogleLogin = await this.authService.handleGoogleLogin(user);

        done(null, { handleGoogleLogin });
    }

}
