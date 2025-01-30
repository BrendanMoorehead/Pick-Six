import supabase from '../db.js';
export async function registerUser(req, res) {
  const { email, password, username } = req.body;
  if (!email || !password || !username)
    return res.status(400).json({ error: 'All fields required' });
  try {
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
