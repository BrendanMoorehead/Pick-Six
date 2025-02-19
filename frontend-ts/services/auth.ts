import { supabase } from '../supabaseClient';

let cachedToken: string | null = null;
let cachedId: string | null = null;
export async function getToken(): Promise<{ token: string; user_id: string }> {
  if (cachedToken && cachedId) return { token: cachedToken, user_id: cachedId };

  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) {
    console.error('🔴 Error fetching token:', error);
    throw new Error('User not authenticated');
  }

  cachedToken = data.session.access_token;
  cachedId = data.session.user.id;
  console.log('✅ Fetched Token:', cachedToken);
  console.log('✅ Fetched UUID:', data.session.user.id);
  return { token: cachedToken, user_id: cachedId };
}
