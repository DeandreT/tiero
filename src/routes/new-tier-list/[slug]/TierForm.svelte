<script>
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';

	/**
	 * @type {string}
	 */
	export let action; // 'add' or 'remove'
	/**
	 * @type {string}
	 */
	export let position; // 'up' or 'down'
	/**
	 * @type {import('$lib/tiers/tiers').Tier[]}
	 */
	export let tiers;
  /**
	 * @type {number | null}
	 */
   export let listId;


	const getPositionValue = () => {
		return position === 'up' ? 0 : tiers.length - (action === 'add' ? 0 : 1);
	};

	const tierButtonClass = 'btn variant-filled flex-col justify-center items-center';
	const tierButtonStyle = 'margin: 0 !important';
</script>

<form method="POST" action={`?/${action}`} use:enhance>
	<input type="hidden" name="position" value={position} />
	<input type="hidden" name="listId" value={listId} />
	<input type="hidden" name="tierId" value={tiers[getPositionValue()]?.id} />
	<button class={tierButtonClass}>
		<Icon style={tierButtonStyle} icon={`mdi:${action === 'add' ? 'plus' : 'minus'}`} />
		<Icon style={tierButtonStyle} icon={`mdi:chevron-${position}`} />
	</button>
</form>
