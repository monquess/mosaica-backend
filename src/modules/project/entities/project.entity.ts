import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class ProjectEntity {
	@ApiProperty({
		example: 1,
		type: Number,
	})
	id: number;

	@ApiProperty({
		example: 1,
		type: Number,
	})
	userId: number;

	@ApiProperty({
		example: 'Cool Project',
		type: String,
	})
	title: string;

	@ApiProperty({
		example: 'This is a cool project description.',
		type: String,
		required: false,
	})
	description?: string | null;

	@ApiProperty({
		type: Number,
		example: 800,
	})
	width: number;

	@ApiProperty({
		type: Number,
		example: 600,
	})
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
	content: Prisma.JsonValue;

	@ApiProperty({
		example: true,
		type: Boolean,
	})
	isTemplate: boolean;

	@ApiProperty({
		example: '2025-03-09T16:17:53.019Z',
		type: String,
	})
	createdAt: Date;

	@ApiProperty({
		example: '2025-03-09T16:17:53.019Z',
		type: String,
	})
	updatedAt: Date;

	constructor(partial: Partial<ProjectEntity>) {
		Object.assign(this, partial);
	}
}
