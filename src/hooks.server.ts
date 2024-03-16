import { handle as authHandle, userHandle } from '$lib/auth/auth';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(authHandle, userHandle);
