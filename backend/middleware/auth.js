import supabase from '../db.js';

export async function authenticateUser(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '').trim();

  if (!token) {
    // console.log('No token provided');
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  // console.log('Received Token:', token); // Log the token for debugging

  try {
    const { data, error } = await supabase.auth.getUser(token);
    const user = data?.user;

    if (error || !user) {
      // console.error('Supabase Error:', error.message); // Log Supabase error
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    if (!user) {
      // console.log('User not found for token');
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // console.log('Authenticated User:', user); // Log the authenticated user

    req.user = user; // Attach user to the request
    console.log('Authenticated user: ', user);
    next();
  } catch (err) {
    // console.error('Error verifying token:', err); // Log unexpected errors
    return res.status(500).json({ error: 'Server error' });
  }
}
