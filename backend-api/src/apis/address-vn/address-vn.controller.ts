import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AddressVnService } from './address-vn.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller('address-vn')
export class AddressVnController {
    constructor(
        private readonly addressVnService: AddressVnService
    ) { }

    @Post('import')
    async importLocations(): Promise<string> {
        const filePath = path.resolve(__dirname, '../../../address-vn/address.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        await this.addressVnService.importLocations(data);
        return 'Locations imported successfully!';
    }

    @Get('provinces')
    async getProvinces() {
        return await this.addressVnService.getProvinces();
    }

    @Get()
    async getProvinceWithDistricts(
        @Query('provinceId') provinceId: number,
        @Query('districtId') districtId: number,
        @Query('wardId') wardId: number,
    ) {
        const queryParams = { provinceId, districtId, wardId };
        return await this.addressVnService.getAddress(queryParams);
    }

}
