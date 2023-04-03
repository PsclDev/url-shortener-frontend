import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default () => {
	return defineConfig({
		plugins: [sveltekit()]
	});
};
