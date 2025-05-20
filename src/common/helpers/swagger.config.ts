import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
	.setTitle('Mosaica API')
	.setDescription('Mosaica API documentation')
	.setVersion('1.0')
	.setLicense('MIT', 'https://opensource.org/licenses/MIT')
	.addServer(process.env.APP_URL || 'http://localhost:3000', 'Local development server')
	.addBearerAuth({
		type: 'http',
		scheme: 'bearer',
		bearerFormat: 'JWT',
		in: 'header',
	})
	.build();
