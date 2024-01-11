import { redirect } from '@sveltejs/kit';
import { createTierList } from '$lib/tiers';
export const ssr = false;
export const load = async () => {
	const newListResp = await createTierList();
	// Handle promise
	if (!newListResp.success) {
    return
  }
  redirect(307, `/new-tier-list/${newListResp.id}`);
};
