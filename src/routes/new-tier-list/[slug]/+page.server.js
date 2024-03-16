import { getTierList, addTier, removeTier, moveTier, updateTier } from '$lib/tiers/tiers';

export const load = async ({ params }) => {
	const { slug } = params;
	const resp = await getTierList(parseInt(slug));
	if (!resp.success) {
		return { success: false, id: null, tierList: null };
	}
	return { success: true, id: slug, tierList: resp.data };
};

export const actions = {
	add: async ({  request }) => {
		try {
			const data = await request.formData();
			const listId = data.get('listId');
			let position = data.get('position');

			if (!listId) {
				throw new Error('No list ID provided');
			}
			if (!position || (position !== 'up' && position !== 'down')) {
				position = 'up';
			}

			await addTier(Number(listId), position);
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

			if (!tierId) {
				throw new Error('No tier ID provided');
			}

			await removeTier(Number(tierId));
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

			if (!tierId) {
				throw new Error('No tier ID provided');
			}
			if (!direction) {
				throw new Error('No direction provided');
			}
			await moveTier(Number(tierId), String(direction));
			return { success: true };
		} catch (err) {
			console.error(err);
			return { success: false };
		}
	},
	dndChange: async ({ request }) => {
		try {
			const data = await request.formData();
			let tiers = data.get('tiers');
			try {
				tiers = JSON.parse(String(tiers));
			} catch (err) {
				return { success: false };
			}

			if (!Array.isArray(tiers)) {
				throw new Error('Invalid tier list');
			}
			// Loop through the tiers and update their positions
			for (let i = 0; i < tiers.length; i++) {
				const tier = tiers[i];
				if (!tier.id || tier.position == null) {
					throw new Error('Invalid tier');
				}
				await updateTier(Number(tier.id), { position: tier.position });
			}
			return { success: true };
		} catch (err) {
			console.error(err);
			return { success: false };
		}
	}
};
