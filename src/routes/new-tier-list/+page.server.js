import { redirect } from '@sveltejs/kit';
import { createTierList } from '$lib/tiers/tiers';

export const load = async () => {
	const newListResp = await createTierList();
	if (!newListResp.success) {
		return;
	}
	redirect(307, `/new-tier-list/${newListResp.id}`);
};
