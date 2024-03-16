<script lang="ts">
	import { signIn } from '@auth/sveltekit/client';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';
	import { page } from '$app/stores';

	export let parent: SvelteComponent;

	const modalStore = getModalStore();
</script>

{#if $modalStore[0]}
	<div class="card p-4 w-modal shadow-xl space-y-4">
		<header class="modal-header text-center">
			<h2 class="text-2xl font-bold">Account</h2>
		</header>
		<main class="modal-body">
			<div class="flex justify-center space-x-4">
				{#if !$page.data.session}
					<button class="btn variant-ghost-primary" on:click={() => signIn('google')}
						>Sign In with Google</button
					>
				{:else if $page.data.session.user}
					<p>Logged in as {$page.data.session.user.email}</p>
				{/if}
			</div>
		</main>
		<footer class="modal-footer flex justify-end space-x-4">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Close</button>
		</footer>
	</div>
{/if}
