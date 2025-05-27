import { CurrentUser } from '@common/decorators';
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
} from '@nestjs/common';
import { User } from '@prisma/client';
import { ProjectService } from './project.service';
import { ProjectEntity } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Paginated, PaginationOptionsDto } from '@common/pagination';
import {
	ApiProjectCreate,
	ApiProjectFindAll,
	ApiProjectFindById,
	ApiProjectRemove,
	ApiProjectUpdate,
} from './decorators/api-project.decorator';

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
