import { getTierList, addTier, removeTier, moveTier } from '$lib/tiers';

export const load = async ({ params }) => {
  const { slug } = params;
  const resp = await getTierList(parseInt(slug));
  if(!resp.success) {
    return { success: false, id: null, tiers: [] };
  }
  return { success: true, id: slug, tiers: resp.data };
}

export const actions = {
  add: async ({ request }) => {
    try {
      const data = await request.formData();
      const listID = data.get('listID');
      const position = data.get('position');
      if (!listID) {
        throw new Error('No list ID provided');
      }

      // @ts-ignore
      await addTier(listID, position);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },
  remove: async ({ request }) => {
    try {
      const data = await request.formData();
      const tierID = data.get('tierID');

      // @ts-ignore
      await removeTier(tierID);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },
  move: async ({ request }) => {
    try {
      const data = await request.formData();
      const tierID = data.get('tierID');
      const direction = data.get('direction');

      // @ts-ignore
      await moveTier(tierID, direction);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  }
};
