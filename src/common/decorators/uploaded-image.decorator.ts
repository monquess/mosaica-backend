import {
	UploadedFile,
	ParseFilePipe,
	FileTypeValidator,
	MaxFileSizeValidator,
} from '@nestjs/common';
import { ImageTransformPipe } from '@modules/s3/pipes/image-transform.pipe';

export interface UploadedImageOptions {
	width?: number;
	height?: number;
}

export const UploadedImage = (options: UploadedImageOptions = {}) =>
	UploadedFile(
		new ParseFilePipe({
			validators: [
				new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp|tiff)' }),
				new MaxFileSizeValidator({
					maxSize: 10e6,
					message: 'File is too large. Max file size is 10MB',
				}),
			],
			fileIsRequired: false,
		}),
		new ImageTransformPipe(options)
	);
