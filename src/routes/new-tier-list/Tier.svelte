<script>
	import { createEventDispatcher } from 'svelte';
	const dispatchEvent = createEventDispatcher();
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import Icon from '@iconify/svelte';

	import Item from '$lib/components/Item.svelte';

	/**
	 * @type {string}
	 */
	export let name;
	/**
	 * @type {string}
	 */
	export let color;
	/**
	 * @type {number}
	 */
	export let index;
	/**
	 * @type {number}
	 */
	export let tierListLength;

	/**
	 * @type {Array<{name: string, image: string, id: string}>}
	 */
	export let items;

	/**
	 * @param {{ detail: { items: { name: string; image: string; id: string; }[]; }; }} e
	 */
	function handleConsider(e) {
		items = e.detail.items;
	}

	/**
	 * @param {{ detail: { items: { name: string; image: string; id: string; }[]; }; }} e
	 */
	function handleFinalize(e) {
		items = e.detail.items;
	}

	const tierRowClass =
		'tier-row w-full flex flex-row border border-1 border-black h-28 bg-zinc-900';
	const labelClass =
		'label w-32 h-28 relative flex text-center justify-center items-center border-r border-black';
</script>

<div class={tierRowClass}>
	<div class={labelClass} style="background-color: {color}">
		<button class="absolute left-0 top-0 text-black" on:click={() => dispatchEvent('removeTier')}>
			<Icon icon="mdi:close" />
		</button>
		<input
			type="text"
			bind:value={name}
			class="label-text text-center font-bold w-full h-full bg-transparent"
		/>
	</div>
	<div
		class="tier flex p-0 m-0 w-full flex-row"
		use:dndzone={{ items }}
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
		{#if index !== 0}
			<button class="btn-icon-xl" on:click={() => dispatchEvent('moveUp')}>
				<Icon icon="mdi:chevron-up" />
			</button>
		{/if}
		{#if index !== tierListLength - 1}
			<button class="btn-icon-xl" on:click={() => dispatchEvent('moveDown')}>
				<Icon icon="mdi:chevron-down" />
			</button>
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
