import db from '$lib/db';

/**
 * @typedef {Object} Item
 * @property {number} id
 * @property {number} tier_id
 * @property {number} position
 * @property {string} name
 * @property {string} description
 * @property {string} image
 * @typedef {Object} Tier
 * @property {number} id
 * @property {number} index
 * @property {string} name
 * @property {string} description
 * @property {string} color
 * @property {Item[]} items
 * @param {number} listID
 */

/**
 * Finds a unique tier color for a given list ID.
 *
 * @param {number} listID - The ID of the tier list.
 * @returns {Promise<string>} - A string containing the hex color code of the unique tier color
 */
export async function findUniqueTierColor(listID) {
	const tiersResp = await getTierList(listID);
	const tiers = tiersResp.data;
	let color = '#ff0000';
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

/**
 * Retrieves a tier list with its associated tiers and items from the database.
 * @param {number} listID - The ID of the list to retrieve.
 * @returns {Promise<{ success: boolean, id: number, data: Array<Tier> }>} - The retrieved tier list.
 */
export async function getTierList(listID) {
	const res = db
		.query(
			`
      SELECT
        t.id AS tier_id,
        t.position AS tier_position,
        t.name AS tier_name,
        t.color AS tier_color,
        t.description AS tier_description,
        l.id AS list_id,
        l.name AS list_name,
        l.description AS list_description,
        JSON_GROUP_ARRAY(
            JSON_OBJECT(
                'id', i.id,
                'tier_id', i.tier_id,
                'position', i.position,
                'name', i.name,
                'description', i.description,
                'image', i.image
            )
        ) AS items
      FROM tiers t
      JOIN lists l ON l.id = t.list_id
      LEFT JOIN items i ON i.tier_id = t.id
      WHERE l.id = ?
      AND t.deleted IS NULL
      GROUP BY t.id
      ORDER BY t.position ASC, i.position ASC
    `
		)
		.all(listID);
	// Parse the JSON string into an object
	const tiers = res.map((tier) => ({
		id: tier.tier_id,
		index: tier.tier_position,
		name: tier.tier_name,
		description: tier.tier_description,
		color: tier.tier_color,
		items: JSON.parse(tier.items)
	}));
	return { success: true, id: listID, data: tiers };
}

export async function createTierList() {
	const timestamp = Math.floor(Date.now() / 1000);
	const res = db
		.query(
			`
      INSERT INTO lists (
        name,
        description,
        last_updated,
        created_at,
        created_by,
        updated_by
      )
      VALUES (?, ?, ?, ?, 1, 1)
      RETURNING id;
    `
		)
		.all('New Tier List', 'This is a new tier list', timestamp, timestamp);
	const tierList = await getTierList(res[0].id);
	if (!tierList.success) {
		return { success: false, id: null, data: [] };
	}
	return { success: true, id: res[0].id, data: tierList.data };
}

/**
 * @param {number} listID
 * @param {string} position
 */
export async function addTier(listID, position) {
	const timestamp = Math.floor(Date.now() / 1000);

	// Determine the new position for the tier
	let newPosition;
	if (position === 'up') {
		// Find the current minimum position and subtract 1
		const minPosResult = db
			.query('SELECT MIN(position) as minPos FROM tiers WHERE list_id = ?')
			.all(listID);
		const minPos = minPosResult[0]?.minPos ?? 0;
		newPosition = minPos - 1;
	} else if (position === 'down') {
		// Find the current maximum position and add 1
		const maxPosResult = db
			.query('SELECT MAX(position) as maxPos FROM tiers WHERE list_id = ?')
			.all(listID);
		const maxPos = maxPosResult[0]?.maxPos ?? -1;
		newPosition = maxPos + 1;
	} else {
		return { success: false, id: null, data: [], error: 'Invalid position' };
	}

	// Insert the new tier
	const color = await findUniqueTierColor(listID);
	const insertRes = db
		.query(
			`
    INSERT INTO tiers (
      list_id,
      position,
      color,
      name,
      description,
      last_updated,
      created_at,
      created_by,
      updated_by
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, 1, 1) RETURNING id;
  `
		)
		.all(listID, newPosition, color, 'New Tier', 'This is a new tier', timestamp, timestamp);

	if (!insertRes || !insertRes[0]?.id) {
		return { success: false, id: null, data: [], error: 'Failed to insert tier' };
	}

	// Retrieve the updated tier list
	const tierListResp = await getTierList(listID);
	if (!tierListResp.success) {
		return { success: false, id: null, data: [], error: 'Failed to retrieve tier list' };
	}

	return { success: true, id: listID, data: tierListResp.data };
}

/**
 * @param {number} tierID
 */
export async function removeTier(tierID) {
	const timestamp = Math.floor(Date.now() / 1000);
	const query = db.query(
		`
      UPDATE tiers
      SET deleted = ?,
        deleted_by = 1,
        last_updated = ?
      WHERE id = ? RETURNING id, list_id;
    `
	);
	const res = query.all(timestamp, timestamp, tierID);
	const { id, list_id } = res[0];
	if (!id) {
		throw new Error('Failed to remove tier');
	}
	const tierListResp = await getTierList(list_id);
	if (!tierListResp.success) {
		throw new Error('Failed to retrieve tier list');
	}
	return { success: true, id: list_id, data: tierListResp.data };
}

/**
 * @param {number} tierID
 * @param {string} direction
 */
export async function moveTier(tierID, direction) {
	const timestamp = Math.floor(Date.now() / 1000);

	// Retrieve the current tier information
	const selectResult = db
		.query(
			`
    SELECT
      id,
      list_id,
      position
    FROM tiers
    WHERE id = ?;
  `
		)
		.all(tierID);
	const { id, list_id, position } = selectResult[0];
	if (!id) {
		throw new Error('Failed to move tier');
	}

	// Calculate the new position
	let newPosition = direction === 'up' ? position - 1 : position + 1;

	// Find the tier currently at the new position
	const swapResult = db
		.query(
			`
    SELECT id
    FROM tiers
    WHERE list_id = ?
    AND position = ?;
  `
		)
		.all(list_id, newPosition);
	const swapTierId = swapResult[0]?.id;

	if (!swapTierId) {
		throw new Error('No tier to swap with at the new position');
	}

	// Swap the positions of the two tiers
	db.query(
		`
    UPDATE tiers
    SET position = ?,
      last_updated = ?
    WHERE id = ?;
  `
	).run(newPosition, timestamp, id);

	db.query(
		`
    UPDATE tiers
    SET position = ?,
      last_updated = ?
    WHERE id = ?;
  `
	).run(position, timestamp, swapTierId);

	// Retrieve the updated tier list
	const tierListResp = await getTierList(list_id);
	if (!tierListResp.success) {
		throw new Error('Failed to retrieve tier list');
	}

	return { success: true, id: list_id, data: tierListResp.data };
}
