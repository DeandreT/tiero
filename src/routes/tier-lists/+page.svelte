<script>
	export let data;

	/**
	 * @type {any[]}
	 */
	let tierLists = [];

	$: if (data.success) {
		tierLists = data.tierLists;
	}
</script>

<h1>My Tier Lists</h1>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Description</th>
			<th>Last Updated</th>
			<th>Deleted</th>
			<th>Tiers</th>
		</tr>
	</thead>
	<tbody>
		{#each tierLists as list}
			<tr>
				<td><a href="/tier-list/{list.id}">{list.name}</a></td>
				<td>{list.description}</td>
				<td>{list.lastUpdated}</td>
				<td>{list.deleted ? 'Yes' : 'No'}</td>
				<td>{list.numTiers}</td>
			</tr>
		{/each}
	</tbody>
</table>
