import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import { getPaginationMeta, Paginated, PaginationOptionsDto } from '@common/pagination';

@Injectable()
export class ProjectService {
	constructor(private readonly prisma: PrismaService) {}

	async findAll(
		{ page, limit }: PaginationOptionsDto,
		userId: number
	): Promise<Paginated<ProjectEntity>> {
		const [projects, count] = await this.prisma.$transaction([
			this.prisma.project.findMany({
				where: { userId },
				skip: (page - 1) * limit,
				take: limit,
			}),
			this.prisma.project.count({ where: { userId } }),
		]);

		return {
			data: projects,
			meta: getPaginationMeta(count, page, limit),
		};
	}

	async findById(id: number, userId: number): Promise<ProjectEntity> {
		return this.prisma.project.findFirstOrThrow({
			where: { id, userId },
		});
	}

	async create(dto: CreateProjectDto, userId: number): Promise<ProjectEntity> {
		return this.prisma.project.create({
			data: { ...dto, userId },
		});
	}

	async update(
		id: number,
		dto: UpdateProjectDto,
		userId: number
	): Promise<ProjectEntity> {
		return this.prisma.project.update({
			where: { id, userId },
			data: dto,
		});
	}

	async remove(id: number, userId: number): Promise<void> {
		await this.prisma.project.delete({
			where: { id, userId },
		});
	}
}
