import { PrismaService } from '@modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { UpdateProjectDto } from './dto/update-project.dto';
import { getPaginationMeta, Paginated, PaginationOptionsDto } from '@common/pagination';
import { Prisma, User } from '@prisma/client';
import { ProjectFilteringOptionsDto } from './dto/filtering-options.dto';
import { CreateFromTemplateDto } from './dto/create-from-template.dto';
import { S3Service } from '@modules/s3/s3.service';
import { StoragePath } from '@modules/s3/enum/storage-path.enum';

@Injectable()
export class ProjectService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly s3Service: S3Service
	) {}

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

	async findAllTemplates(
		{ title }: ProjectFilteringOptionsDto,
		{ page, limit }: PaginationOptionsDto
	): Promise<Paginated<ProjectEntity>> {
		const where: Prisma.ProjectWhereInput = {
			AND: [{ isTemplate: true }, { title: { contains: title, mode: 'insensitive' } }],
		};

		const [projects, count] = await this.prisma.$transaction([
			this.prisma.project.findMany({
				where,
				skip: (page - 1) * limit,
				take: limit,
			}),
			this.prisma.project.count({ where }),
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

	async createFromTemplate(
		id: number,
		dto: CreateFromTemplateDto,
		user: User
	): Promise<ProjectEntity> {
		const template = await this.prisma.project.findUniqueOrThrow({
			where: { id, isTemplate: true },
		});

		return this.prisma.project.create({
			data: {
				...dto,
				content: template.content as Prisma.InputJsonValue,
				width: template.width,
				height: template.height,
				userId: user.id,
			},
		});
	}

	async uploadShare(id: number, image: Express.Multer.File) {
		const imageData = await this.s3Service.uploadFile(StoragePath.SHARES, image);

		return imageData.url;
	}

	async uploadPreview(id: number, preview: Express.Multer.File) {
		const previewData = await this.s3Service.uploadFile(StoragePath.PREVIEWS, preview);

		await this.prisma.project.update({
			where: { id },
			data: { previewUrl: previewData.url },
		});

		return previewData.url;
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
