import {
    Body,
    Controller,
    HttpStatus,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
    ParseFilePipe,
    ParseFilePipeBuilder,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common';
import { MediaService } from './media.service';
import { FileUploadInterceptor } from 'src/cores/decorators/FileUploadInterceptor.decorator';
import { TYPE_FILE } from 'src/common/constant/type_file.enum';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

    // Upload Single File
    @Post('upload-single')
    @FileUploadInterceptor(TYPE_FILE.IMAGE)
    uploadSingle(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // Max 5MB
                    new FileTypeValidator({ fileType: /image\/(jpeg|png|jpg)/ }),
                ],
            }),
        )
        file: Express.Multer.File,
    ) {
        return this.mediaService.uploadImage(file);
    }

    // Upload Multiple Files
    @Post('upload-multiple')
    @UseInterceptors(FilesInterceptor('files', 5)) // Max 5 files
    uploadMultiple(
        @UploadedFiles(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: 'image/*' })
                .addMaxSizeValidator({ maxSize: 5 * 1024 * 1024 }) // Max 5MB
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                }),
        )
        files: Express.Multer.File[],
    ) {
        const fileInfo = files.map((file) => ({
            fileName: file.filename,
            mimeType: file.mimetype,
            size: file.size,
        }));

        return {
            message: 'Files uploaded successfully',
            files: fileInfo,
        };
    }
}
