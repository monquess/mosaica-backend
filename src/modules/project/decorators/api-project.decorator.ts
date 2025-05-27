import { ApiAuth, ApiPaginatedResponse } from '@common/decorators';
import { applyDecorators } from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiParam,
} from '@nestjs/swagger';
import { ProjectEntity } from '../entities/project.entity';

export const ApiProjectFindAll = () =>
	applyDecorators(
		ApiAuth(),
		ApiOperation({ summary: 'Get paginated projects' }),
		ApiPaginatedResponse<ProjectEntity>(ProjectEntity)
	);

export const ApiProjectFindById = () =>
	applyDecorators(
		ApiAuth(),
		ApiOperation({ summary: 'Get project by id' }),
		ApiParam({
			name: 'id',
			description: 'Project id',
		}),
		ApiOkResponse({
			type: ProjectEntity,
		}),
		ApiNotFoundResponse({
			description: 'Project not found',
		})
	);

export const ApiProjectCreate = () =>
	applyDecorators(
		ApiAuth(),
		ApiOperation({ summary: 'Create project' }),
		ApiCreatedResponse({
			type: ProjectEntity,
		}),
		ApiNotFoundResponse({
			description: 'User not found',
		})
	);

export const ApiProjectUpdate = () =>
	applyDecorators(
		ApiAuth(),
		ApiOperation({ summary: 'Update project' }),
		ApiParam({
			name: 'id',
			description: 'Project id',
		}),
		ApiOkResponse({
			type: ProjectEntity,
		}),
		ApiNotFoundResponse({
			description: 'Project not found',
		})
	);

export const ApiProjectRemove = () =>
	applyDecorators(
		ApiAuth(),
		ApiOperation({ summary: 'Remove project' }),
		ApiParam({
			name: 'id',
			description: 'Project id',
		}),
		ApiNoContentResponse(),
		ApiNotFoundResponse({
			description: 'Project not found',
		})
	);
