import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const appConfig = {
    port: process.env.PORT,
    apiVersion: process.env.API_VERSION,
    host: process.env.HOST,

}

export const dbConfig: DataSourceOptions = {
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: Boolean(process.env.DB_SYNCHRONIZE),
    logging: false,
    migrations: ['src/db/*.ts'],
    entities: [
        process.env.NODE_ENV === 'production'
            ? 'dist/**/**/*.entity{.ts,.js}'
            : 'src/**/**/*.entity{.ts,.js}'
    ],
};

export const jwtConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
}

export const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['email', 'profile'],
}

export const dataSource = new DataSource(dbConfig);
