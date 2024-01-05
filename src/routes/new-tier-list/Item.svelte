<script>
	/**
	 * @type {number}
	 */
	export let index;
	/**
	 * @type {number}
	 */
	export let id;
	/**
	 * @type {string}
	 */
	export let name;
	/**
	 * @type {string}
	 */
	export let image;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="tier-item flex flex-col justify-center items-center space-y-2">
	<img class="w-28 h-28 object-contain" src={image} alt={name} />
</div>
