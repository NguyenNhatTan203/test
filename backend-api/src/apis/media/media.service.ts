import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MediaEntity } from './entities/media.entity';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MediaService {
    private readonly logger = new Logger(MediaService.name);

    constructor(
        @InjectRepository(MediaEntity)
        private readonly cloudinaryAssetRepository: Repository<MediaEntity>,
    ) { }

    async uploadImage(file: Express.Multer.File) {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(file.path,
                {
                    resource_type: 'auto',
                    folder: 'booking-system',
                },
                async (error, result) => {
                    if (error) {
                        this.logger.error('Upload failed', error);
                        reject(error);
                    } else {
                        this.logger.log('Upload successful');

                        const newAsset = this.cloudinaryAssetRepository.create({
                            ...result,
                        });

                        try {
                            await this.cloudinaryAssetRepository.save(newAsset);
                            resolve(result);

                            if (file.path) {
                                fs.unlink(file.path, (err) => {
                                    if (err) {
                                        this.logger.error('Error deleting the file', err);
                                    } else {
                                        this.logger.log(`File ${file.path} deleted successfully`);
                                    }
                                });
                            }
                        } catch (err) {
                            this.logger.error('Error saving asset to the database', err);
                            reject(err);
                        }
                    }
                }
            );
        });
    }
}
