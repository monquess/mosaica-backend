import { registerAs } from '@nestjs/config';
import { IsEnum, IsString, Max, Min, IsNotEmpty, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

import { NodeEnv } from '@common/enum/node-env.enum';
import { validateConfig } from './validate-config';

class AppEnvironmentVariables {
	@IsEnum(NodeEnv)
	readonly NODE_ENV: NodeEnv = NodeEnv.DEV;

	@IsInt()
	@Min(0)
	@Max(65535)
	@Transform(({ value }) => Number(value))
	readonly PORT: number = 3000;

	@IsString()
	@IsNotEmpty()
	readonly APP_URL: string;

	@IsString()
	@IsNotEmpty()
	readonly CLIENT_URL: string;

	@IsString()
	@IsNotEmpty()
	readonly DEFAULT_AVATAR_PATH: string;

	@IsString()
	@IsNotEmpty()
	readonly DEFAULT_POSTER_PATH: string;
}

interface IApp {
	env: NodeEnv;
	port: number;
	url: string;
	clientUrl: string;
	defaults: {
		avatar: string;
		poster: string;
	};
}

export const appConfig = registerAs<IApp>('app', async () => {
	const env = await validateConfig(AppEnvironmentVariables);
	return {
		env: env.NODE_ENV,
		port: env.PORT,
		url: env.APP_URL,
		clientUrl: env.CLIENT_URL,
		defaults: {
			avatar: env.DEFAULT_AVATAR_PATH,
			poster: env.DEFAULT_POSTER_PATH,
		},
	};
});

export type AppConfig = typeof appConfig;
