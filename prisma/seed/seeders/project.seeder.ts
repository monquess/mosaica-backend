import { PrismaClient } from '@prisma/client';
import Seeder from './abstract.seeder';
import ProjectFactory from '../factories/project.factory';

class ProjectSeeder extends Seeder {
	constructor(prisma: PrismaClient) {
		super(prisma);
	}

	async run(): Promise<void> {
		const users = await this.prisma.user.findMany();

		await this.prisma.project.deleteMany();

		await this.prisma.project.createMany({
			data: new ProjectFactory(20, users).data,
		});
	}
}

export default ProjectSeeder;
