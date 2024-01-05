<script>
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
	 * @type {Array<{name: string, image: string, id: string}>}
	 */
	export let items = [];

	const tierRowClass =
		'tier-row w-full flex flex-row border border-1 border-black h-28 bg-zinc-900';
	const labelClass =
		'label overflow-y-scroll w-32 h-28 flex text-center justify-center items-center border-r border-black';
</script>

<div class={tierRowClass}>
	<div class={labelClass} style="background-color: {color}">
		<span
			class="label-text text-center items-center justify-center flex font-bold w-full h-full bg-transparent"
		>
			{name}
		</span>
	</div>
	<div class="tier flex p-0 m-0 w-full flex-row">
		{#each items as item (item.id)}
			<div>
				<Item name={item.name} image={item.image} />
			</div>
		{/each}
	</div>
</div>

<style>
	.label-text {
		box-shadow: none;
		border: none;
		outline: none;
		color: #000000;
	}
</style>
