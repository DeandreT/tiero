import db from '$lib/db';

export const handle = async ({ event, resolve }) => {
  event.locals.db = db;
  const response = await resolve(event);
  return response;
}