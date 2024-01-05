<script>
	// @ts-nocheck

	import Tier from './Tier.svelte';

	let tiers = [
		{
			name: 'Tier1',
			color: '#ff0000',
			items: [
				{
					name: 'Item1',
					image: 'https://via.placeholder.com/125',
					id: 1
				},
				{
					name: 'Item2',
					image: 'https://via.placeholder.com/150',
					id: 2
				}
			]
		},
		{
			name: 'Tier2',
			color: '#00ff00',
			items: [
				{
					name: 'Item3',
					image: 'https://via.placeholder.com/125',
					id: 3
				}
			]
		}
	];

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

	/**
	 * Adds a new tier at the top of the tiers array.
	 */
	function addTierTop() {
		const tierName = findUniqueTierName();
    const tierColor = findUniqueTierColor();
		tiers = [
			{
				name: tierName,
				color: tierColor,
				items: []
			},
			...tiers
		];
	}

	/**
	 * Adds a new tier at the bottom of the tiers array.
	 */
	function addTierBottom() {
		const tierName = findUniqueTierName();
    const tierColor = findUniqueTierColor();
		tiers = [
			...tiers,
			{
				name: tierName,
				color: tierColor,
				items: []
			}
		];
	}

	/**
	 * Removes the top tier from the `tiers` array.
	 */
	function removeTierTop() {
		tiers = tiers.slice(1);
	}

	/**
	 * Removes the bottom tier from the `tiers` array.
	 */
	function removeTierBottom() {
		tiers = tiers.slice(0, -1);
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
		if (index === undefined) return;
		if (index === tiers.length - 1) return;
		const tier = tiers[index];
		tiers = [...tiers.slice(0, index), tiers[index + 1], tier, ...tiers.slice(index + 2)];
	}
</script>

<div class="tier-list space-y-0 text-center flex flex-col items-center w-full">
	{#each tiers as { name, color, items }, index}
		<Tier
			{index}
      tierListLength={tiers.length}
			bind:name
			bind:color
			bind:items
			onMoveUp={() => moveTierUp(index)}
			onMoveDown={() => moveTierDown(index)}
		/>
	{/each}
	<div class="flex flex-row space-x-4">
		<button class="btn" on:click={addTierTop}>Add Tier Top</button>
		<button class="btn" on:click={addTierBottom}>Add Tier Bottom</button>
		<button class="btn" on:click={removeTierTop}>Remove Tier Top</button>
		<button class="btn" on:click={removeTierBottom}>Remove Tier Bottom</button>
	</div>
</div>
