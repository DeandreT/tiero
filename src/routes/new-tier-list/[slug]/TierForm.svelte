<script lang="ts">
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import type { Tier } from '$lib/db/schema/tiers';

	export let action: 'add' | 'remove';
	export let position: 'up' | 'down';
	export let tiers: Tier[];
	export let listId: string;

	$: positionValue = position === 'up' ? 0 : tiers.length - (action === 'add' ? 0 : 1);
	$: icon = action === 'add' ? 'plus' : 'minus';
</script>

<form method="POST" action={`?/${action}`} use:enhance>
	{#if action === 'add'}
		<input type="hidden" name="position" value={position} />
		<input type="hidden" name="listId" value={listId} />
	{:else if action === 'remove'}
		<input type="hidden" name="tierId" value={tiers[positionValue]?.id} />
	{/if}
	<button
		class="btn variant-filled flex-col justify-center items-center"
		style="margin: 0 !important"
	>
		<Icon style="margin: 0 !important" icon={`mdi:${icon}`} />
		<Icon style="margin: 0 !important" icon={`mdi:chevron-${position}`} />
	</button>
</form>
