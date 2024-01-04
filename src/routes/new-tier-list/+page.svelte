<script>
  import Tier from './Tier.svelte';

  let tiers = [
    {
      name: 'Tier1',
      color: '#ff0000'
    },
    {
      name: 'Tier2',
      color: '#00ff00'
    }
  ];

  /**
   * Adds a new tier at the top of the tiers array.
   */
  function addTierTop() {
    tiers = [
      {
        name: 'New Tier',
        color: '#ff0000'
      },
      ...tiers
    ];
  }

  /**
   * Adds a new tier at the bottom of the tiers array.
   */
  function addTierBottom() {
    tiers = [
      ...tiers,
      {
        name: 'New Tier',
        color: '#ff0000'
      }
    ];
  }

  /**
   * Removes the top tier from the `tiers` array.
   */
  function removeTierTop() {
    tiers = tiers.slice(1);
  }

  /**
   * Removes the bottom tier from the `tiers` array.
   */
  function removeTierBottom() {
    tiers = tiers.slice(0, -1);
  }

  /**
   * Moves a tier up in the list.
   * @param {number} index - The index of the tier to move up.
   */
  function moveTierUp(index) {
    if (index === 0) return;
    const tier = tiers[index];
    tiers = [...tiers.slice(0, index - 1), tier, tiers[index - 1], ...tiers.slice(index + 1)];
  }

  /**
   * Moves a tier down in the list.
   * @param {number | undefined} index - The index of the tier to move down.
   */
  function moveTierDown(index) {
    if (index === undefined) return;
    if (index === tiers.length - 1) return;
    const tier = tiers[index];
    tiers = [...tiers.slice(0, index), tiers[index + 1], tier, ...tiers.slice(index + 2)];
  }
</script>

<div class="container h-full mx-auto flex justify-center items-center w-full">
  <div class="tier-list space-y-0 text-center flex flex-col items-center w-full">
    {#each tiers as tier, index}
      <Tier
        tierName={tier.name}
        tierColor={tier.color}
        onMoveUp={() => moveTierUp(index)}
        onMoveDown={() => moveTierDown(index)}
      />
    {/each}
    <div class="flex flex-row space-x-4">
      <button class="btn" on:click={addTierTop}>Add Tier Top</button>
      <button class="btn" on:click={addTierBottom}>Add Tier Bottom</button>
      <button class="btn" on:click={removeTierTop}>Remove Tier Top</button>
      <button class="btn" on:click={removeTierBottom}>Remove Tier Bottom</button>
    </div>
  </div>
</div>
