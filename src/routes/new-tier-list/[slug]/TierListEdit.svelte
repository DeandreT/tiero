<script>
	// @ts-nocheck

	import { dndzone } from 'svelte-dnd-action';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { flip } from 'svelte/animate';
	import Tier from './Tier.svelte';
	import TierForm from './TierForm.svelte';

	/**
	 * @type {import('$lib/tiers/tiers').TierList}
	 */
	export let tierList;
	/**
	 * @type {number | null}
	 */
	export let listId;

	//@ts-ignore
	function handleConsider(e) {
		tierList.tiers = e.detail.items;
	}

	//@ts-ignore
	function handleFinalize(e) {
		let newTierPositions = e.detail.items.toReversed().map((tier, index) => {
			return {
				id: tier.tierId,
				position: index
			};
		});
    // Update the tierList with the new tier positions
		tierList.tiers = e.detail.items;
		// Push changes to the server
		const formData = new FormData();
		formData.append('listId', listId);
		formData.append('tiers', JSON.stringify(newTierPositions));
		fetch('?/dndChange', {
			method: 'POST',
			body: formData
		}).then(resp => resp.json()).then(data => {
			if (!data.success) {
				invalidateAll();
			}
		});
	}

	$: tiers = tierList?.tiers?.map((tier) => {
		return {
			...tier,
			tierId: tier.id
		};
	});

</script>

<div
	class="tier-list space-y-0 text-center flex flex-col items-center w-full overflow-y-scroll"
	style={'max-height: 80vh;'}
	use:dndzone={{ items: tiers, type: 'tier' }}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
>
	{#each tiers as { id, name, color, position, items } (id)}
		<div class="w-full" animate:flip={{ duration: 200 }}>
			<Tier {id} {position} tierListLength={tiers.length} bind:name bind:color bind:items />
		</div>
	{/each}
</div>
<div class="flex flex-row space-x-4 p-2 fixed bottom-2 bg-gray-800 rounded-lg">
	<TierForm action="add" position="up" {tiers} {listId} />
	<TierForm action="add" position="down" {tiers} {listId} />
	<TierForm action="remove" position="up" {tiers} {listId} />
	<TierForm action="remove" position="down" {tiers} {listId} />
</div>
