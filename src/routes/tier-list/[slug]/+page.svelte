<script>
	import TierList from './TierList.svelte';

	/**
	 * @type {{success: boolean, tiers: tiers}}
	 */
	export let data;
	/**
	 * @type {Array<{name: string, color: string, items: Array<{name: string, image: string, id: string}>}>}
	 */
	let tiers = [];
  console.log(data);
	if (data.success) {
		tiers = data.tiers;
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center w-full">
  <TierList {tiers} />
</div>
