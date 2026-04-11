import { createBrowserClient } from '@supabase/ssr';

let client = null;

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url === 'your-supabase-url') {
    // Return a mock client when Supabase isn't configured
    return {
      auth: {
        getUser: async () => ({ data: { user: { id: 'mock-id', email: 'demo@livingcard.ca', user_metadata: { first_name: 'Demo', last_name: 'User' } } }, error: null }),
        getSession: async () => ({ data: { session: { user: { id: 'mock-id' } } }, error: null }),
        signUp: async () => ({ data: { user: { id: 'mock-id' } }, error: null }),
        signInWithPassword: async () => ({ data: { user: { id: 'mock-id' } }, error: null }),
        signOut: async () => {},
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
    };
  }

  if (!client) {
    client = createBrowserClient(url, key);
  }
  return client;
}
