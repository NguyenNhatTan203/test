import { Module } from "@nestjs/common";
import { AddressVnController } from "src/apis/address-vn/address-vn.controller";
import { AddressVnModule } from "src/apis/address-vn/address-vn.module";
import { AuthController } from "src/apis/auth/auth.controller";
import { AuthModule } from "src/apis/auth/auth.module";
import { BusOperatorController } from "src/apis/busOperator/busOperator.controller";
import { BusOperatorModule } from "src/apis/busOperator/busOperator.module";
import { MediaController } from "src/apis/media/media.controller";
import { MediaModule } from "src/apis/media/media.module";
import { RolesController } from "src/apis/roles/roles.controller";
import { RolesModule } from "src/apis/roles/roles.module";
import { RoutesController } from "src/apis/routes/routes.controller";
import { RoutesModule } from "src/apis/routes/routes.module";

@Module({
    imports: [
        AuthModule,
        RolesModule,
        BusOperatorModule,
        AddressVnModule,
        MediaModule,
        RoutesModule
    ],
    controllers: [
        AuthController,
        RolesController,
        BusOperatorController,
        AddressVnController,
        MediaController,
        RoutesController
    ],
})
export class RouterAdminModule { }