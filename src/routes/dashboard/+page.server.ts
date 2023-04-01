import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ cookies }) => {
	if (!cookies.get('token')) {
		throw redirect(307, '/');
	}
}) satisfies LayoutServerLoad;
