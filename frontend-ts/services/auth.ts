import { supabase } from '../supabaseClient';

let cachedToken: string | null = null;

export async function getToken(): Promise<string> {
  if (cachedToken) return cachedToken;

  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) {
    console.error('🔴 Error fetching token:', error);
    throw new Error('User not authenticated');
  }

  cachedToken = data.session.access_token;
  console.log('✅ Fetched Token:', cachedToken);
  return cachedToken;
}
