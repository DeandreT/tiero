<script>
	import { dndzone } from 'svelte-dnd-action';
	import Icon from '@iconify/svelte';

	import Item from './Item.svelte';

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
	 * @type {() => void}
	 */
	export let onMoveUp;
	/**
	 * @type {() => void}
	 */
	export let onMoveDown;

	function emitMoveUp() {
		onMoveUp();
	}

	function emitMoveDown() {
		onMoveDown();
	}

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

	const tierRowClass = "tier-row w-full flex flex-row border border-1 border-black h-28 bg-zinc-900"
	const labelClass = "label max-w-32 h-28 flex text-center justify-center items-center border-r border-black"
</script>

<div class={tierRowClass}>
	<div
		class={labelClass}
		style="background-color: {color}"
	>
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
			<Item id={item.id} name={item.name} image={item.image} {index} />
		{/each}
	</div>
	<div
		class="btn-group-vertical flex flex-col justify-center items-center"
		style="border-radius: 0px;"
	>
		{#if index !== 0}
			<button class="btn-icon-xl" on:click={emitMoveUp}>
				<Icon icon="mdi:chevron-up" />
			</button>
		{/if}
		{#if index !== tierListLength - 1}
			<button class="btn-icon-xl" on:click={emitMoveDown}>
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
	.label-text::selection,
	.label-text::-moz-selection {
		background: white !important;
	}
</style>
