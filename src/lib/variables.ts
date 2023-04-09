import { env } from '$env/dynamic/public';

export const variables = {
	apiBasePath: env.PUBLIC_API_BASE_PATH,
	redirectBasePath: env.PUBLIC_REDIRECT_BASE_PATH
};
