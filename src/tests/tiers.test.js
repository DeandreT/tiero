import { createTierList, addTier, getTierList, findUniqueTierColor } from '$lib/tiers';
import { describe, it, expect } from 'vitest';

describe('findUniqueTierColor', () => {
	it('should return a unique tier color', async () => {
		const listId = 1;
		const color = await findUniqueTierColor(listId);
		expect(typeof color).toBe('string');
		expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
	});
});

describe('createTierList', () => {
	it('should return the tier list with correct structure', async () => {
		const result = await createTierList();

		expect(result).toEqual({
			success: true,
			id: expect.any(Number),
			data: expect.arrayContaining([])
		});
	});
});

describe('addTier', () => {
	// TODO: Add test for position
  it('should add a tier to the list', async () => {
    const listId = 1;
    const position = 'up';
    const result = await addTier(listId, position);

    expect(result).toEqual({
      success: true,
      id: expect.any(Number),
      data: expect.arrayContaining([])
    });
  });
});

describe('getTierList', () => {
	it('should return the tier list with correct structure', async () => {
		const listId = 1;
		const result = await getTierList(listId);

		expect(result).toEqual({
			success: true,
			id: listId,
			data: expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(Number),
					index: expect.any(Number),
					name: expect.any(String),
					description: expect.any(String),
					color: expect.any(String),
				})
			])
		});
	});
});
