<script>
	import TierList from './TierList.svelte';

	/**
	 * @type {{success: boolean, tierList: import('$lib/tiers/tiers').TierList}}
	 */
	export let data;

	/**
	 * @type {import('$lib/tiers/tiers').Tier[]}
	 */
	let tiers = [];

	$: if (data.success) {
		tiers = data.tierList.tiers;
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center w-full">
	<TierList {tiers} />
</div>
