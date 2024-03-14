<script>
	import TierList from './TierListEdit.svelte';
	import { page } from '$app/stores';

	export let data;
	/**
	 * @type {import('$lib/tiers/tiers').TierList}
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

{#if data}
	<div class="container h-full mx-auto flex justify-center items-center w-full">
		<TierList {tierList} listId={listId} />
	</div>
{/if}
