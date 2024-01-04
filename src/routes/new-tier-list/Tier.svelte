<script>
  import Icon from '@iconify/svelte';

	export let tierName = 'New Tier';
	export let tierColor = '#000000';

  /**
	 * @type {() => void}
	 */
   export let onMoveUp;
  /**
	 * @type {() => void}
	 */
   export let onMoveDown;

  function emitMoveUp() {
    onMoveUp();
  }

  function emitMoveDown() {
    onMoveDown();
  }
</script>

<div class="tier-row w-full flex flex-row border border-1 border-black min-h-28">
	<div
		class="label max-w-32 min-h-28 flex text-center justify-center items-center"
		style="background-color: {tierColor}"
	>
		<input
			bind:value={tierName}
			class="label-text text-center text-2xl font-bold w-full h-full bg-transparent"
		/>
	</div>
  <div class="tier flex p-0 m-0 w-full flex-row bg-zinc-900">
    <div class="tier-item"></div>
    <div class="tier-item"></div>
    <div class="tier-item"></div>
  </div>
  <div class="tier-controls flex flex-col justify-center items-center bg-black">
    <button class="btn-icon" on:click={emitMoveUp}>
      <Icon icon="mdi:chevron-up" />
    </button>
    <button class="btn-icon " on:click={emitMoveDown}>
      <Icon icon="mdi:chevron-down" />
    </button>
  </div>
</div>

<style>
	.label-text {
		box-shadow: none;
		border: none;
		outline: none;
		color: #000000;
	}
	.label-text::selection,
	.label-text::-moz-selection {
		background: white !important;
	}
</style>
