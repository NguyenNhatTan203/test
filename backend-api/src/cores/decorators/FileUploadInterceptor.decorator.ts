import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import multer from "multer";

export function FileUploadInterceptor(fieldName: string) {
    return applyDecorators(
        UseInterceptors(
            FileInterceptor(fieldName, {
                storage: multer.diskStorage({
                    destination: './upload',
                    filename: (req, file, cb) => {
                        const filename = `${Date.now()}-${file.originalname}`;
                        cb(null, filename);
                    },
                }),
            }),
        ),
    );
}