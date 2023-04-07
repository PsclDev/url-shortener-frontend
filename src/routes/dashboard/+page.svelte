<script lang="ts">
	import LinkComponent from '$lib/Link.svelte';
	import type { Link } from '$lib/interfaces';
	import Fa from 'svelte-fa';
	import { faLink } from '@fortawesome/free-solid-svg-icons';
	import { appStore } from '$lib/store';
	import { onDestroy, onMount } from 'svelte';
	import { variables } from '$lib/variables';

	let apiUrl: string;
	onMount(async () => {
		apiUrl = `${variables.apiBasePath}`;
		const res = await fetch(apiUrl, {credentials: 'include'});
		const links = await res.json();
		appStore.set(links);
	});
	
	let links: Link[] = [];
	const unsubscribe = appStore.subscribe(s => links = s);
	
	let url = '';
	let isDuplicate = false;
	let onSubmit = async () => {
		const res = await fetch(apiUrl, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url })
		});
		const link = await res.json();
		appStore.update(l => l = [link, ...links]);
	};

	let urlChanged = (value: string) => {
		if (links.filter((link: Link) => link.url === value).length > 0) {
			isDuplicate = true;
			return;
		}

		isDuplicate = false;
		url = value;
	};

	onDestroy(unsubscribe)
</script>

<svelte:head>
    <title>Shortener - Dashboard</title> 
</svelte:head>

<div class="min-h-screen pt-10 mb-5 place-items-center">
	<form on:submit|preventDefault={onSubmit} class="mb-10">
		<div class="relative">
			<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-white">
				<Fa icon={faLink} />
			</div>
			<input
				on:keyup={({ target: { value } }) => urlChanged(value)}
				type="url"
				class="block w-full p-4 pl-10 text-sm border rounded-lg bg-zinc-900 border-zinc-700 placeholder-white text-gray-200"
				placeholder="Url"
				required
			/>

			<button
				disabled={isDuplicate}
				type="submit"
				class="{isDuplicate
					? 'disabled:opacity-50'
					: ''} absolute right-2.5 bottom-2.5 text-white text-sm font-bold rounded-lg px-4 py-2 bg-blue-600 hover:bg-blue-700"
			>
				Shorten
			</button>
		</div>
	</form>

	<div class="flex flex-column justify-center md:justify-start flex-wrap gap-5">
		{#key links}
			{#each links as link}
			<LinkComponent item={link} />
			{/each}
		{/key}
	</div>
</div>
