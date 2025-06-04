import { OmitType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';

export class CreateFromTemplateDto extends OmitType(CreateProjectDto, [
	'content',
	'height',
	'width',
] as const) {}
