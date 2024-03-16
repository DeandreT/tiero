<script>
	// @ts-nocheck
	import Tier from './Tier.svelte';

  export let tiers;
</script>

<div
	class="tier-list space-y-0 text-center flex flex-col items-center w-full overflow-y-scroll"
	style={'max-height: 80vh;'}
>
	{#each tiers as { id, name, color, items } (id)}
		<div class="w-full">
			<Tier bind:name bind:color bind:items />
		</div>
	{/each}
</div>
