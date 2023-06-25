import { env } from '$env/dynamic/public';

export const variables = {
	apiBasePath: env.PUBLIC_API_BASE_PATH + '/v1',
	redirectBasePath: env.PUBLIC_REDIRECT_BASE_PATH
};
