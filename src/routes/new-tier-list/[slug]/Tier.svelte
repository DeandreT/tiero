<script lang="ts">
	import { enhance } from '$app/forms';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import Icon from '@iconify/svelte';
	import Item from '$lib/components/Item.svelte';
	import type { HexColor } from '$lib/tiers/tiers';
	import type { Item as ItemT } from '$lib/db/schema/tiers';

	export let name: string;

	export let color: HexColor;
	export let id = 0;
	export let position = 0;
	export let tierListLength = 0;

	export let items: ItemT[];

	function handleConsider(e: CustomEvent) {
		items = e.detail.items.map((item: ItemT) => ({
			name: item.name,
			image: item.image,
			id: item.id.toString()
		}));
	}

	function handleFinalize(e: CustomEvent) {
		items = e.detail.items.map((item: ItemT) => ({
			name: item.name,
			image: item.image,
			id: item.id.toString()
		}));
	}

	const tierRowClass =
		'tier-row w-full flex flex-row border border-1 border-black h-28 bg-zinc-900';
	const labelClass =
		'label w-32 h-28 relative flex text-center justify-center items-center border-r border-black';
</script>

<div class={tierRowClass}>
	<div class={labelClass} style="background-color: {color}">
		<form method="POST" action="?/remove" use:enhance>
			<input type="hidden" name="tierId" value={id} />
			<button class="absolute left-0 top-0 text-black">
				<Icon icon="mdi:close" />
			</button>
		</form>
		<input
			type="text"
			bind:value={name}
			class="label-text text-center font-bold w-full h-full bg-transparent"
		/>
	</div>
	<div
		class="tier flex p-0 m-0 w-full flex-row"
		use:dndzone={{ items, type: 'item' }}
		on:consider={handleConsider}
		on:finalize={handleFinalize}
	>
		{#each items as item (item.id)}
			<div animate:flip={{ duration: 200 }}>
				<Item name={item.name} image={item.image} />
			</div>
		{/each}
	</div>
	<div
		class="btn-group-vertical flex flex-col justify-center items-center"
		style="border-radius: 0px;"
	>
		{#if position < tierListLength - 1}
			<form method="POST" action="?/move" use:enhance>
				<input type="hidden" name="tierId" value={id} />
				<input type="hidden" name="direction" value="up" />
				<button class="btn-icon-xl">
					<Icon icon="mdi:chevron-up" />
				</button>
			</form>
		{/if}
		{#if position > 0}
			<form method="POST" action="?/move" use:enhance>
				<input type="hidden" name="tierId" value={id} />
				<input type="hidden" name="direction" value="down" />
				<button class="btn-icon-xl">
					<Icon icon="mdi:chevron-down" />
				</button>
			</form>
		{/if}
	</div>
</div>

<style>
	.label-text {
		box-shadow: none;
		border: none;
		outline: none;
		color: #000000;
	}

	.label-text::-moz-selection {
		background: white !important;
	}
	.label-text::selection {
		background: white !important;
	}
</style>
