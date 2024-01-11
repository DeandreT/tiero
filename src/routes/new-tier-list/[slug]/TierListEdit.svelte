<script>
	// @ts-nocheck
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import Tier from './Tier.svelte';
	import TierForm from './TierForm.svelte';

	export let tiers;
	export let listID;

	function handleConsider(e) {
		tiers = e.detail.items;
	}

	function handleFinalize(e) {
		tiers = e.detail.items;
	}
</script>

<div
	class="tier-list space-y-0 text-center flex flex-col items-center w-full overflow-y-scroll"
	style={'max-height: 80vh;'}
	use:dndzone={{ items: tiers, type: 'tier'}}
	on:consider={handleConsider}
	on:finalize={handleFinalize}
>
	{#each tiers as { id, name, color, items }, index (id)}
		<div class="w-full" animate:flip={{ duration: 200 }}>
			<Tier {id} {index} tierListLength={tiers.length} bind:name bind:color bind:items />
		</div>
	{/each}
</div>
<div class="flex flex-row space-x-4 p-2 fixed bottom-2 bg-gray-800 rounded-lg">
	<TierForm action="add" position="up" {tiers} {listID} />
	<TierForm action="add" position="down" {tiers} {listID} />
	<TierForm action="remove" position="up" {tiers} {listID} />
	<TierForm action="remove" position="down" {tiers} {listID} />
</div>
