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
	content: Prisma.JsonValue;

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
