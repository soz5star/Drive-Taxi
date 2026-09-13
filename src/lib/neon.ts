import { createClient, SupabaseAuthAdapter } from '@neondatabase/neon-js';

const authUrl = import.meta.env.VITE_NEON_AUTH_URL || '';
const dataApiUrl = import.meta.env.VITE_NEON_DATA_API_URL || '';

// Only initialize when both URLs are present so the app degrades gracefully
// instead of throwing at import time.
// The public booking form posts without a login, so anonymous tokens are
// enabled; what they can touch is controlled by the `anonymous` role grants
// and RLS policies in neon/migrations.
export const client = authUrl && dataApiUrl
  ? createClient({
      auth: {
        adapter: SupabaseAuthAdapter(),
        url: authUrl,
        allowAnonymous: true,
      },
      dataApi: {
        url: dataApiUrl,
      },
    })
  : null;

export const isNeonConfigured = () => !!client;

type AuthClient = NonNullable<typeof client>['auth'];
export type Session = NonNullable<Awaited<ReturnType<AuthClient['getSession']>>['data']['session']>;
export type User = Session['user'];
