import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    constructor(private moduleRef: ModuleRef) {
        super({
            passReqToCallback: true,
        });
    }
}
