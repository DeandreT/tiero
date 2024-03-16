<script lang="ts">
	export let name: string;
	export let image: string;
</script>

{#if name}
	<div class="tier-item flex flex-col justify-center items-center space-y-2">
		<img class="w-28 h-28 object-contain" src={image} alt={name} />
	</div>
{/if}
