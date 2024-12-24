import { DynamicModule, Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { appConfig } from 'src/configs/app.config';
import { RouterAdminModule } from './router/admin.route.module'


const { apiVersion } = appConfig;

@Module({
    imports: [
        RouterAdminModule,
        RouterModule.register([
            {
                path: ``,
                children: [
                    {
                        path: `/v${apiVersion}`,
                        module: RouterAdminModule
                    },
                    // {
                    //     path: `/:locale/v${apiVersion}/admin`,
                    //     module: RouterAdminModule
                    // }
                ]
            }
        ])
    ]
})
export class AppRouterModule {
    static forRoot(): DynamicModule {
        return {
            module: AppRouterModule
        }
    }
}

