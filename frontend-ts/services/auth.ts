import { supabase } from '../supabaseClient';

export async function getToken(): Promise<string> {
  console.log('Refreshing session...');

  // 🔥 Refresh the session before fetching the token
  await supabase.auth.refreshSession();

  const { data: session, error } = await supabase.auth.getSession();

  if (error || !session?.session?.access_token) {
    console.error('Error fetching token:', error);
    throw new Error('User not authenticated');
  }

  console.log('Fetched Token:', session.session.access_token); // Debug log
  return session.session.access_token;
}
