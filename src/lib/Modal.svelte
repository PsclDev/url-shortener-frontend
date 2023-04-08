<script lang="ts">
	import type { Link } from './interfaces';
	import Fa from 'svelte-fa';
	import { faXmark } from '@fortawesome/free-solid-svg-icons';
	import { createEventDispatcher, onMount } from 'svelte';
	import { appStore } from './store';
	import { variables } from './variables';

	let apiUrl: string;
	onMount(async () => {
		apiUrl = `${variables.apiBasePath}`;
	});

	const dispatch = createEventDispatcher();
	function closeModal() {
		dispatch('close');
	}

	async function onSubmit() {
		const { url, slug } = item;
		await fetch(`${apiUrl}/link/${item.id}`, {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url, slug })
		});

		appStore.update(l => l = [item, ...$appStore.filter((link: Link) => link.id !== item.id)]);
		closeModal();
	}

	async function trash() {
		await fetch(`${apiUrl}/link/${item.id}`, {
			method: 'DELETE',
			credentials: 'include'
		});

		appStore.update(l => l = [...$appStore.filter((link: Link) => link.id !== item.id)]);
	}

	export let item: Link;

	let valueChanged = (key: string, value: string) => {
		item[key] = value;
	};
</script>

<div class="overflow-hidden fixed inset-0 z-50 justify-center items-center flex">
	<div class="relative w-2/4 my-6 mx-auto max-w-3xl">
		<div class="border-0 rounded-lg relative flex flex-col w-full bg-zinc-800">
			<form on:submit|preventDefault={onSubmit}>
				<div
					class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"
				>
					<h3 class="text-2xl font-semibold truncate ml-1">Edit Link</h3>
					<button
						class="p-1 ml-auto text-gray-500 float-right text-2xl leading-none font-semibold"
						on:click={closeModal}
					>
						<span class="text-gray-500 opacity-4 h-6 w-6 text-1xl block">
							<Fa class="cursor-pointer hover:text-white" size="1.1x" icon={faXmark} />
						</span>
					</button>
				</div>
				<div class="relative p-6 flex-auto">
					<div class="flex flex-col gap-3">
						<input
							on:keyup={({ target: { value } }) => valueChanged('url', value)}
							value={item.url}
							type="url"
							class="block w-full p-4 text-sm border rounded-lg bg-zinc-900 border-zinc-700 placeholder-white text-gray-200"
							placeholder="Url"
							required
						/>
						<input
							on:keyup={({ target: { value } }) => valueChanged('slug', value)}
							value={item.slug}
							type="text"
							class="block w-full p-4 text-sm border rounded-lg bg-zinc-900 border-zinc-700 placeholder-white text-gray-200"
							placeholder="Slug (optional)"
						/>
					</div>
				</div>
				<div
					class="flex items-center justify-end gap-5 p-4 border-t border-solid border-blueGray-200 rounded-b"
				>
					<button
						type="submit"
						class="text-white text-sm font-bold rounded-lg px-4 py-2 bg-emerald-500 hover:bg-emerald-700"
					>
						Update
					</button>
					<button
						type="button"
						on:click={trash}
						class="text-white text-sm font-bold rounded-lg px-4 py-2 bg-red-500 hover:bg-red-700 mr-3"
					>
						Delete
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
<div class="opacity-50 fixed inset-0 z-40 bg-gray-700" />
