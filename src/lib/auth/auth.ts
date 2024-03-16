import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/sveltekit/providers/google';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { dDb as db } from '$lib/db/db';
import type { User } from '$lib/db/schema/users';
import { users } from '$lib/db/schema/users';
import { eq, sql } from 'drizzle-orm';
import type { Handle } from '@sveltejs/kit';

export const { handle, signIn, signOut } = SvelteKitAuth({
	providers: [Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })]
});

export const userHandle: Handle = async ({ event, resolve }) => {
	// TODO: FIGURE OUT WHY THIS DOESN'T WORK
	// const session = await event.locals.auth();
	const session = {};
	if (session?.user) {
		const { email, name, image } = session.user;

		if (!email) {
			throw new Error('No email found in user session');
		}
		const existingUser = await getUser(email);

		const newUser = !existingUser && email ? await addUser(email, name, image) : null;

		event.locals.user = { ...session.user, ...(existingUser ?? newUser ?? {}) };
	}
	return await resolve(event);
};

const getUser = async (email: string): Promise<User | null> => {
	const [user] = await db.select().from(users).where(eq(users.email, email));
	return user || null;
};

const addUser = async (
	email: string,
	name?: string | null,
	image?: string | null
): Promise<User | null> => {
	await db.insert(users).values({
		email,
		name: name || '',
		image: image || '',
		created: Math.floor(Date.now() / 1000)
	});
	return await getUser(email);
};
