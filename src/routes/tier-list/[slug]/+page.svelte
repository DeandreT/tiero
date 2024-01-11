<script>
	import TierList from './TierList.svelte';

	/**
	 * @type {{success: boolean, tiers: import('$lib/tiers').Tier[]}}
	 */
	export let data;

	/**
	 * @type {import('$lib/tiers').Tier[]}
	 */
	let tiers = [];

	if (data.success) {
		tiers = data.tiers;
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center w-full">
	<TierList {tiers} />
</div>
