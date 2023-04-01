<script lang="ts">
	import type { Link } from './interfaces';
	import Fa from 'svelte-fa';
	import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
	import Tooltip from 'sv-tooltip';
	import { copy } from 'svelte-copy';
	import ModalComponent from '$lib/Modal.svelte';

	export let item: Link;
	export let isEditing = false;

	function toggleEdit() {
		isEditing = !isEditing;
	}

	function getHandle() {
		return item.slug ? item.slug : item.id;
	}

	function getShortlink() {
		return `${window.location.origin}/${getHandle()}`;
	}
</script>

<div
	class="block relative w-48 px-6 pt-3 pb-2 bg-zinc-800 border border-zinc-600 rounded-lg shadow"
>
	<div class="flex h-full flex-col justify-between items-center gap-2">
		<a href={item.url} target="_blank">
			<Tooltip tip="open {item.url}" top color="#2563EB">
				<img
					class="text-center h-9 w-auto"
					alt="website favicon"
					src="http://www.google.com/s2/favicons?domain={item.url}&sz=64"
				/>
			</Tooltip>
		</a>
		<div class="cursor-pointer">
			<Tooltip tip="click to copy" bottom color="#2563EB">
				<p use:copy={getShortlink()}>{getHandle()}</p>
			</Tooltip>
		</div>
		<div class="absolute right-3 top-3">
			<button on:click={toggleEdit}>
				<Fa class="cursor-pointer hover:text-blue-500" size="1.1x" icon={faEllipsisV} />
			</button>
		</div>
	</div>
</div>

{#if isEditing}
	<ModalComponent {item} on:close={toggleEdit} />
{/if}
