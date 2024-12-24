import { Injectable } from '@nestjs/common';
import { Province } from './entity/province.entity';
import { District } from './entity/district.entity';
import { Ward } from './entity/ward.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressVnService {
    constructor(
        @InjectRepository(Province) private provinceRepository: Repository<Province>,
        @InjectRepository(District) private districtRepository: Repository<District>,
        @InjectRepository(Ward) private wardRepository: Repository<Ward>,
    ) { }
    async importLocations(data: any[]): Promise<void> {
        for (const province of data) {
            const newProvince = await this.provinceRepository.save({
                name: province.name,
                code: province.code,
                codename: province.codename,
                division_type: province.division_type,
                phone_code: province.phone_code,
            });

            for (const district of province.districts || []) {
                const newDistrict = await this.districtRepository.save({
                    name: district.name,
                    code: district.code,
                    codename: district.codename,
                    division_type: district.division_type,
                    short_codename: district.short_codename,
                    province: newProvince,
                });

                for (const ward of district.wards || []) {
                    await this.wardRepository.save({
                        name: ward.name,
                        code: ward.code,
                        codename: ward.codename,
                        division_type: ward.division_type,
                        short_codename: ward.short_codename,
                        district: newDistrict,
                    });
                }
            }
        }
    }

    async getProvinces() {
        return this.provinceRepository.find();
    }

    async getAddress(queryParams: any) {
        const { provinceId, districtId, wardId } = queryParams;
        if (provinceId && districtId && wardId) {
            return this.getWard(wardId);
        } else if (provinceId && districtId) {
            return this.getDistrictWithWards(districtId);
        } else {
            return this.getProvinceWithDistricts(provinceId);

        }
    }

    private async getProvinceWithDistricts(provinceId: number) {
        return this.provinceRepository.findOne({
            where: { id: provinceId },
            relations: ['districts'],
        });
    }

    private async getDistrictWithWards(districtId: number) {
        return this.districtRepository.findOne({
            where: { id: districtId },
            relations: ['wards'],
        });
    }

    private async getWard(wardId: number) {
        return this.wardRepository.findOne({
            where: { id: wardId },
        });
    }
}
