import { tiers, lists } from '../db/schema/tiers';
import type { Tier, TierList } from '../db/schema/tiers';
import { dDb as db } from '$lib/db/db';
import { and, desc, eq, isNull, sql } from 'drizzle-orm';

export type TierListSummary = {
	id: number;
	name: string;
	description: string;
	lastUpdated: number;
	deleted: number | null;
	numTiers: number;
}

export type HexColor = `#${string}`;

export async function findUniqueTierColor(listId: number): Promise<string> {
	const tiersResp = await getTierList(listId);
	if (!tiersResp.success) {
		throw new Error('Failed to retrieve tier list');
	}
	if (!tiersResp.data) {
		throw new Error('No tier list found');
	}
	const tiers = tiersResp.data.tiers;
	let color: HexColor = '#ff0000'
	while (tiers.some((tier) => tier.color === color)) {
		// Generate a random number and pad it to ensure 6 characters
		color =
			'#' +
			Math.floor(Math.random() * 16777215)
				.toString(16)
				.padStart(6, '0');
	}
	return color;
}

export async function getTierList(
	listId: number
): Promise<{ success: boolean; id: number | null; data: TierList | null }> {
	const res = await db.query.lists.findMany({
		with: {
			tiers: {
				with: {
					items: true
				},
				where: isNull(tiers.deleted),
				orderBy: (_position, { desc }) => [desc(tiers.position)]
			}
		},
		where: and(eq(lists.id, listId), isNull(lists.deleted))
	});

	if (!res) {
		return { success: false, id: null, data: null };
	}

	return { success: true, id: listId, data: res[0] };
}

export async function createTierList(): Promise<{
	success: boolean;
	id: number | null;
	data: TierList | null;
}> {
	const timestamp = Math.floor(Date.now() / 1000);
	const res = await db
		.insert(lists)
		.values({
			name: 'New Tier List',
			description: 'This is a new tier list',
			lastUpdated: timestamp,
			created: timestamp,
			createdBy: 1,
			updatedBy: 1
		})
		.returning({ insertedID: lists.id });

	const tierList = await getTierList(res[0].insertedID);
	if (!tierList.success) {
		return { success: false, id: null, data: null };
	}
	return { success: true, id: res[0].insertedID, data: tierList.data };
}

export async function addTier(
	listId: number,
	position = 'up'
): Promise<{
	success: boolean;
	id: number | null;
	data: TierList | null;
}> {
	const timestamp = Math.floor(Date.now() / 1000);
	if (position !== 'up' && position !== 'down') {
		position = 'up';
	}
	// Determine the new position for the tier
	let newPosition;
	if (position === 'up') {
		// Find the current maximum position and add 1
		const maxPosResult = await db
			.select({
				maxPos: sql`IFNULL(MAX(position), 0) as maxPos`
			})
			.from(tiers)
			.where(and(eq(tiers.listId, listId), isNull(tiers.deleted)));
		const maxPos = Number(maxPosResult[0]?.maxPos ?? 0);
		newPosition = maxPos + 1;
	} else if (position === 'down') {
		// Find the current minimum position and subtract 1
		const minPosResult = await db
			.select({
				minPos: sql`IFNULL(MIN(position), 0) as minPos`
			})
			.from(tiers)
			.where(and(eq(tiers.listId, listId), isNull(tiers.deleted)));
		const minPos = Number(minPosResult[0]?.minPos ?? 0);
		newPosition = minPos - 1;
	} else {
		return { success: false, id: null, data: null };
	}

	if (newPosition < 0) {
		// Shift all positions up by 1
		await db
			.update(tiers)
			.set({ position: sql`position + 1` })
			.where(eq(tiers.listId, listId))
			.execute();
		newPosition = 0; // Set new position to 0 after shifting
	}

	// Insert the new tier
	const color = await findUniqueTierColor(listId);

	const insertRes = await db
		.insert(tiers)
		.values({
			listId,
			position: newPosition,
			color,
			name: 'New Tier',
			description: 'This is a new tier',
			lastUpdated: timestamp,
			created: timestamp,
			createdBy: 2,
			updatedBy: 2
		})
		.returning({ insertedID: tiers.id });

	if (!insertRes || !insertRes[0]?.insertedID) {
		return { success: false, id: null, data: null };
	}

	// Retrieve the updated tier list
	const tierListResp = await getTierList(listId);
	if (!tierListResp.success) {
		return { success: false, id: null, data: null };
	}

	return { success: true, id: listId, data: tierListResp.data };
}

export async function removeTier(tierId: number): Promise<{
	success: boolean;
	id: number | null;
	data: TierList | null;
}> {
	const timestamp = Math.floor(Date.now() / 1000);
	let res = await db
		.update(tiers)
		.set({
			deleted: timestamp,
			deletedBy: 1,
			lastUpdated: timestamp
		})
		.where(eq(tiers.id, tierId))
		.returning({ id: tiers.id, listId: tiers.listId });
	if (!res || !res[0]?.id) {
		throw new Error('Failed to remove tier');
	}

	const { listId } = res[0];
	const tierListResp = await getTierList(listId);
	if (!tierListResp.success) {
		throw new Error('Failed to retrieve tier list');
	}
	return { success: true, id: listId, data: tierListResp.data };
}

export async function moveTier(
	tierId: number,
	direction: 'up' | 'down'
): Promise<{
	success: boolean;
	id: number | null;
	data: TierList | null;
}> {
	const timestamp = Math.floor(Date.now() / 1000);

	// Validate tier exists
	const validRes = await db
		.select({
			id: tiers.id,
			listId: tiers.listId,
			position: tiers.position
		})
		.from(tiers)
		.where(and(eq(tiers.id, tierId), isNull(tiers.deleted)));
	if (!validRes || !validRes[0]?.id) {
		throw new Error('Tier does not exist');
	}
	const { listId, position } = validRes[0];
	// Calculate the new position
	let newPosition = direction === 'up' ? position + 1 : position - 1;

	const newPosRes = await db
		.select({
			id: tiers.id
		})
		.from(tiers)
		.where(and(eq(tiers.listId, listId), eq(tiers.position, newPosition), isNull(tiers.deleted)));
	const swapTierId = newPosRes[0]?.id;

	if (!swapTierId) {
		throw new Error('No tier to swap with at the new position');
	}

	const swapNewRes = await db
		.update(tiers)
		.set({
			position: newPosition,
			lastUpdated: timestamp
		})
		.where(eq(tiers.id, tierId))
		.returning({ id: tiers.id });
	if (!swapNewRes || !swapNewRes[0]?.id) {
		throw new Error('Failed to update tier position');
	}

	const swapOldRes = await db
		.update(tiers)
		.set({
			position,
			lastUpdated: timestamp
		})
		.where(eq(tiers.id, swapTierId))
		.returning({ id: tiers.id });
	if (!swapOldRes || !swapOldRes[0]?.id) {
		throw new Error('Failed to update tier position');
	}

	const tierListResp = await getTierList(listId);
	if (!tierListResp.success) {
		throw new Error('Failed to retrieve tier list');
	}
	return { success: true, id: listId, data: tierListResp.data };
}

export const updateTier = async (
	tierId: number,
	data: Partial<Tier>
): Promise<{
	success: boolean;
	id: number | null;
	data: TierList | null;
}> => {
	const timestamp = Math.floor(Date.now() / 1000);
	const res = await db
		.update(tiers)
		.set({
			...data,
			lastUpdated: timestamp
		})
		.where(eq(tiers.id, tierId))
		.returning({ id: tiers.id, listId: tiers.listId });
	if (!res || !res[0]?.id) {
		throw new Error('Failed to update tier');
	}
	const { listId } = res[0];
	const tierListResp = await getTierList(listId);
	if (!tierListResp.success) {
		throw new Error('Failed to retrieve tier list');
	}
	return { success: true, id: listId, data: tierListResp.data };
};

export async function getTierListSummaries(): Promise<TierListSummary[]> {
	const res = db
		.select({
			id: lists.id,
			name: lists.name,
			description: lists.description,
			lastUpdated: lists.lastUpdated,
			deleted: lists.deleted,
			numTiers: sql<number>`COUNT(tiers.id) as numTiers`
		})
		.from(lists)
		.leftJoin(tiers, and(eq(tiers.listId, lists.id), isNull(tiers.deleted)))
		.where(isNull(lists.deleted))
		.groupBy(lists.id)
		.orderBy(desc(lists.lastUpdated));
	return res;
}
