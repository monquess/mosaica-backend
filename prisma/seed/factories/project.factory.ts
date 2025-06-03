import { faker } from '@faker-js/faker';
import { Prisma, User } from '@prisma/client';
import Factory from './abstract.factory';

class ProjectFactory extends Factory<Prisma.ProjectCreateManyInput> {
	private users: User[];

	constructor(count: number = 10, users: User[] = []) {
		super(count);
		this.users = users;
		this.create();
	}

	create() {
		for (let i = 0; i < this._count; i++) {
			const user = faker.helpers.arrayElement(this.users);

			if (!user) {
				continue;
			}

			this._data.push({
				title: faker.lorem.words({ min: 2, max: 5 }),
				description: faker.lorem.paragraphs({ min: 1, max: 3 }),
				content: [
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
				width: faker.number.int({ min: 600, max: 1200 }),
				height: faker.number.int({ min: 400, max: 800 }),
				userId: user.id,
			});
		}
	}
}

export default ProjectFactory;
