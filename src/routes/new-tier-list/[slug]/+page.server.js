import { getTierList, addTier, removeTier, moveTier } from '$lib/tiers/tiers';

export const load = async ({ params }) => {
  const { slug } = params;
  const resp = await getTierList(parseInt(slug));
  if(!resp.success) {
    return { success: false, id: null, tierList: null };
  }
  return { success: true, id: slug, tierList: resp.data };
}

export const actions = {
  add: async ({ request }) => {
    try {
      const data = await request.formData();
      const listId = data.get('listId');
      const position = data.get('position');
      if (!listId) {
        throw new Error('No list ID provided');
      }

      // @ts-ignore
      await addTier(listId, position);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },
  remove: async ({ request }) => {
    try {
      const data = await request.formData();
      const tierId = data.get('tierId');

      // @ts-ignore
      await removeTier(tierId);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  },
  move: async ({ request }) => {
    try {
      const data = await request.formData();
      const tierId = data.get('tierId');
      const direction = data.get('direction');

      // @ts-ignore
      await moveTier(tierId, direction);
      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false };
    }
  }
};
