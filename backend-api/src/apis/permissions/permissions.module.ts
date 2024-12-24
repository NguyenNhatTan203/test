import { Module } from '@nestjs/common';
import { PermissionService } from './permissions.service';
import { PermissionController } from './permissions.controller';

@Module({
  providers: [PermissionService],
  controllers: [PermissionController]
})
export class PermissionModule { }
