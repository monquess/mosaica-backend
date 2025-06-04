import { CurrentUser, Public, UploadedImage } from '@common/decorators';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UseInterceptors,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { ProjectService } from './project.service';
import { ProjectEntity } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Paginated, PaginationOptionsDto } from '@common/pagination';
import {
	ApiProjectCreate,
	ApiProjectCreateFromTemplate,
	ApiProjectFindAll,
	ApiProjectFindAllTemplates,
	ApiProjectFindById,
	ApiProjectRemove,
	ApiProjectUpdate,
} from './decorators/api-project.decorator';
import { ProjectFilteringOptionsDto } from './dto/filtering-options.dto';
import { CreateFromTemplateDto } from './dto/create-from-template.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('projects')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@ApiProjectFindAll()
	@Get()
	findAll(
		@Query() paginationOptions: PaginationOptionsDto,
		@CurrentUser() user: User
	): Promise<Paginated<ProjectEntity>> {
		return this.projectService.findAll(paginationOptions, user.id);
	}

	@ApiProjectFindAllTemplates()
	@Public()
	@Get('/templates')
	findAllTemplates(
		@Query() filteringOptions: ProjectFilteringOptionsDto,
		@Query() paginationOptions: PaginationOptionsDto
	): Promise<Paginated<ProjectEntity>> {
		return this.projectService.findAllTemplates(filteringOptions, paginationOptions);
	}

	@ApiProjectFindById()
	@Get(':id')
	findById(
		@Param('id', ParseIntPipe) id: number,
		@CurrentUser() user: User
	): Promise<ProjectEntity> {
		return this.projectService.findById(id, user.id);
	}

	@ApiProjectCreate()
	@Post()
	create(
		@Body() createProjectDto: CreateProjectDto,
		@CurrentUser() user: User
	): Promise<ProjectEntity> {
		return this.projectService.create(createProjectDto, user.id);
	}

	@ApiProjectCreateFromTemplate()
	@Post(':id/templates')
	createFromTemplate(
		@Param('id', ParseIntPipe) id: number,
		@Body() createFromTemplateDto: CreateFromTemplateDto,
		@CurrentUser() user: User
	): Promise<ProjectEntity> {
		return this.projectService.createFromTemplate(id, createFromTemplateDto, user);
	}

	@Post(':id/share')
	@UseInterceptors(FileInterceptor('image'))
	uploadShare(
		@Param('id', ParseIntPipe) id: number,
		@UploadedImage({
			width: 400,
			height: 400,
		})
		image: Express.Multer.File
	) {
		return this.projectService.uploadShare(id, image);
	}

	@ApiProjectUpdate()
	@Patch(':id')
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateProjectDto: UpdateProjectDto,
		@CurrentUser() user: User
	): Promise<ProjectEntity> {
		return this.projectService.update(id, updateProjectDto, user.id);
	}

	@ApiProjectRemove()
	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':id')
	remove(
		@Param('id', ParseIntPipe) id: number,
		@CurrentUser() user: User
	): Promise<void> {
		return this.projectService.remove(id, user.id);
	}
}
