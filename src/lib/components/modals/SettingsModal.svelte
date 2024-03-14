<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';

	export let parent: SvelteComponent;

	const modalStore = getModalStore();
</script>

{#if $modalStore[0]}
	<div class="card p-4 w-modal shadow-xl space-y-4">
		<header class="modal-header text-center">
			<h2 class="text-2xl font-bold">Settings</h2>
		</header>
		<main class="modal-body">

		</main>
		<footer class="modal-footer flex justify-end space-x-4">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Close</button>
		</footer>
	</div>
{/if}
