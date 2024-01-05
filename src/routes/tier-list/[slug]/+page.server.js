import db from '$lib/db';

export const load = async ({ params }) => {
	const { slug } = params;
	return new Promise((resolve, reject) => {
		db.all(
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
      GROUP BY t.id
      ORDER BY t.position ASC, i.position ASC
    `,
			slug,
			(err, rows) => {
				if (err) {
					console.error(err);
					reject({ success: false, tiers: [] });
				} else {
					const tiers = rows.map((row) => ({
						id: row.tier_id,
						index: row.tier_position,
						name: row.tier_name,
						description: row.tier_description,
						color: row.tier_color,
						items: JSON.parse(row.items)
					}));

					resolve({ success: true, tiers });
				}
			}
		);
	});
};
