<script>
	// @ts-nocheck

	import astra from '$lib/assets/astra.png';

	export let index;
	export let id =
		Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	export let name = 'World';
	export let image = astra;

	function handleDragStart(event) {
		event.dataTransfer.setData('application/json', JSON.stringify({ id, index, type: 'item' }));
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="tier-item flex flex-col justify-center items-center space-y-2"
	draggable="true"
	on:dragstart={handleDragStart}
  id={id}
  aria
>
	<img class="w-28 h-28 object-contain" src={image} alt={name} />
</div>
