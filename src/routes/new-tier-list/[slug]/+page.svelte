<script>
	import TierList from './TierListEdit.svelte';
	import { page } from '$app/stores';

	export let data;
	/**
	 * @type {import('$lib/db/schema/tiers').TierList}
	 */
	let tierList;
	/**
	 * @type {number | null}
	 */
	$: listId = parseInt($page.params.slug);
	$: if (data.success && data.tierList) {
		tierList = data.tierList;
	}
</script>

{#if data.success && tierList}
	<div class="container h-full mx-auto flex justify-center items-center w-full">
		<TierList {tierList} listId={listId} />
	</div>
{:else}
	<div class="container h-full mx-auto flex justify-center items-center">
		<div class="space-y-10 text-center flex flex-col items-center">
			<p class="text-2xl font-bold">Tier List Not Found</p>
			<p class="text-lg">The tier list you are looking for does not exist.</p>
		</div>
	</div>
{/if}
