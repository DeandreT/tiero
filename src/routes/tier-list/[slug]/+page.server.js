import { getTierList } from '$lib/tiers/tiers';

export const load = async ({ params }) => {
	const { slug } = params;
	const resp = await getTierList(parseInt(slug));
  if(!resp.success) {
    return { success: false, id: null, tierList: null };
  }
  return { success: true, id: resp.id, tierList: resp.data };
}