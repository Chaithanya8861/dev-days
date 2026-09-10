import { beforeEach, describe, expect, it } from 'vitest';
import { publishers } from '../../db/schema';
import { createTestDatabase } from '../../db/test-helpers';
import type { Database } from './db';
import { getAllPublishers } from './publishers';

describe('publisher data-access helpers', () => {
    let db: Database;

    beforeEach(async () => {
        db = await createTestDatabase();
    });

    it('returns publishers ordered by name', async () => {
        await db.insert(publishers).values([
            { name: 'Zeta Games', description: 'zeta' },
            { name: 'Alpha Games', description: 'alpha' },
        ]);

        const results = await getAllPublishers(db);

        expect(results).toEqual([
            { id: expect.any(Number), name: 'Alpha Games' },
            { id: expect.any(Number), name: 'Zeta Games' },
        ]);
    });

    it('returns an empty list when no publishers exist', async () => {
        await expect(getAllPublishers(db)).resolves.toEqual([]);
    });
});
