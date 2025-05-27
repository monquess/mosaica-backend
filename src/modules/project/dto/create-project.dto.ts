import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsJSON, IsNotEmpty, IsString } from 'class-validator';

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
		type: Object,
		example: {
			attrs: { width: 800, height: 600 },
			className: 'Stage',
			children: [
				{
					className: 'Layer',
					children: [
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
				},
			],
		},
	})
	@IsNotEmpty()
	@IsJSON()
	content: Prisma.InputJsonValue;
}
