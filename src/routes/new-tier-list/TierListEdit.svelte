<script>
	// @ts-nocheck
	import { flip } from 'svelte/animate';
	import Icon from '@iconify/svelte';
	import Tier from './Tier.svelte';

	let tiers = [
		{
			id: 0,
			name: 'New Tier 1',
			color: '#ff0000',
			items: [
				{
					name: 'Item1',
					image: 'https://via.placeholder.com/125',
					id: 0
				},
				{
					name: 'Item2',
					image: 'https://via.placeholder.com/150',
					id: 1
				}
			]
		},
		{
			id: 1,
			name: 'New Tier 2',
			color: '#00ff00',
			items: [
				{
					name: 'Item3',
					image: 'https://via.placeholder.com/125',
					id: 2
				}
			]
		}
	];

	function findUniqueId() {
		let id = 0;
		while (tiers.some((tier) => tier.id === id)) {
			id++;
		}
		return id;
	}

	function findUniqueTierName() {
		let name = 'New Tier 1';
		let i = 1;
		while (tiers.some((tier) => tier.name === name)) {
			name = `New Tier ${i}`;
			i++;
		}
		return name;
	}

	function findUniqueTierColor() {
		let color = '#ff0000';
		let i = 1;
		while (tiers.some((tier) => tier.color === color)) {
			color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
			i++;
		}
		return color;
	}

	function addTier(position) {
		tiers = [
			...tiers.slice(0, position),
			{
				id: findUniqueId(),
				name: findUniqueTierName(),
				color: findUniqueTierColor(),
				items: []
			},
			...tiers.slice(position)
		];
	}

	/**
	 * Adds a new tier at the top of the tiers array.
	 */
	function addTierTop() {
		addTier(0);
	}

	/**
	 * Adds a new tier at the bottom of the tiers array.
	 */
	function addTierBottom() {
		addTier(tiers.length);
	}

	function removeTier(position) {
		tiers = [...tiers.slice(0, position), ...tiers.slice(position + 1)];
	}
	/**
	 * Removes the top tier from the `tiers` array.
	 */
	function removeTierTop() {
		removeTier(0);
	}

	/**
	 * Removes the bottom tier from the `tiers` array.
	 */
	function removeTierBottom() {
		removeTier(tiers.length - 1);
	}

	/**
	 * Moves a tier up in the list.
	 * @param {number} index - The index of the tier to move up.
	 */
	function moveTierUp(index) {
		if (index === 0) return;
		const tier = tiers[index];
		tiers = [...tiers.slice(0, index - 1), tier, tiers[index - 1], ...tiers.slice(index + 1)];
	}

	/**
	 * Moves a tier down in the list.
	 * @param {number | undefined} index - The index of the tier to move down.
	 */
	function moveTierDown(index) {
		if (index === undefined || index === tiers.length - 1) return;
		const tier = tiers[index];
		tiers = [...tiers.slice(0, index), tiers[index + 1], tier, ...tiers.slice(index + 2)];
	}

	const tierButtonClass = 'btn variant-filled flex-col justify-center items-center';
	const tierButtonStyle = 'margin: 0 !important';
</script>

<div
	class="tier-list space-y-0 text-center flex flex-col items-center w-full overflow-y-scroll"
	style={'max-height: 80vh;'}
>
	{#each tiers as { id, name, color, items }, index (id)}
		<div class="w-full" animate:flip={{ duration: 200 }}>
			<Tier
				{index}
				tierListLength={tiers.length}
				bind:name
				bind:color
				bind:items
				on:moveUp={() => moveTierUp(index)}
				on:moveDown={() => moveTierDown(index)}
				on:removeTier={() => removeTier(index)}
			/>
		</div>
	{/each}
</div>
<div class="flex flex-row space-x-4 p-2 fixed bottom-2 bg-gray-800 rounded-lg">
	<button class={tierButtonClass} on:click={addTierTop}>
		<Icon style={tierButtonStyle} icon="mdi:chevron-up" />
		<Icon style={tierButtonStyle} icon="mdi:plus" />
	</button>
	<button class={tierButtonClass} on:click={addTierBottom}>
		<Icon style={tierButtonStyle} icon="mdi:plus" />
		<Icon style={tierButtonStyle} icon="mdi:chevron-down" />
	</button>
	<button class={tierButtonClass} on:click={removeTierTop}>
		<Icon style={tierButtonStyle} icon="mdi:chevron-up" />
		<Icon style={tierButtonStyle} icon="mdi:minus" />
	</button>
	<button class={tierButtonClass} on:click={removeTierBottom}>
		<Icon style={tierButtonStyle} icon="mdi:minus" />
		<Icon style={tierButtonStyle} icon="mdi:chevron-down" />
	</button>
</div>
