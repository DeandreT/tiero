import { getTierList, createTierList } from '$lib/tiers.js';

export const load = async ({ params }) => {
	const { slug } = params;
	const resp = await getTierList(parseInt(slug));
  if(!resp.success) {
    return { success: false, id: null, tiers: [] };
  }
  return { success: true, id: resp.id, tiers: resp.data };
}