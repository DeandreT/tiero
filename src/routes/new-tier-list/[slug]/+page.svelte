<script>
	import TierList from './TierListEdit.svelte';
  import { page } from '$app/stores';

  export let data;
  /**
   * @type {import('$lib/tiers').Tier[]}
   */
  let tiers = [];
  /**
   * @type {number | null}
   */
  $: listID = parseInt($page.params.slug);
  $: if(data.success) {
    tiers = data.tiers;
  }

</script>

{#if data}
  <div class="container h-full mx-auto flex justify-center items-center w-full">
    <TierList {tiers} {listID} />
  </div>
{/if}
