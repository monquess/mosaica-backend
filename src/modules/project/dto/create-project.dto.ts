import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
	@ApiProperty({
		example: 'Cool Project',
		type: String,
	})
	@IsNotEmpty()
	@IsString()
	title: string;

	@ApiProperty({
		example: 'This is a cool project description.',
		type: String,
		required: false,
	})
	@Optional()
	@IsString()
	description?: string;

	@ApiProperty({
		type: Number,
		example: 800,
	})
	@IsNumber()
	width: number;

	@ApiProperty({
		type: Number,
		example: 600,
	})
	@IsNumber()
	height: number;

	@ApiProperty({
		type: Object,
		example: [
			{
				className: 'Rect',
				attrs: {
					x: 20,
					y: 20,
					width: 100,
					height: 100,
					fill: 'red',
				},
			},
		],
	})
	@IsNotEmpty()
	@IsArray()
	content: Prisma.InputJsonValue;
}
