import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ProjectFilteringOptionsDto {
	@ApiProperty({
		type: String,
		example: 'Project Title',
		required: false,
	})
	@IsOptional()
	@IsString()
	readonly title?: string;
}
