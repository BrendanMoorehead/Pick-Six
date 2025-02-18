import supabase from '../db.js';

export async function logoutUser(req, res) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: 'User logged out' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function registerUser(req, res) {
  const { email, password, username } = req.body;
  if (!email || !password || !username)
    return res.status(400).json({ error: 'All fields required' });
  try {
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();
    if (existingUser)
      return res.status(400).json({ error: 'Email is already registered' });
    const { data: existingUsername, error: usernameFetchError } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .single();
    if (existingUsername)
      return res.status(400).json({ error: 'Username is already registered' });

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return res.status(400).json({ error: error.message });
    await supabase
      .from('users')
      .insert([{ id: data.user.id, email, username }]);
    res
      .status(201)
      .json({ message: 'User registered successfully', user: data.user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'All fields required' });
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({
      message: 'User logged in',
      user: data.user,
      token: data.session.access_token,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
