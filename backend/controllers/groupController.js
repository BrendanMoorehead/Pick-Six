import supabase from '../db.js';

export async function createGroup(req, res) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Group name is required' });
  try {
    const user = req.user;
    const { data, error } = await supabase
      .from('groups')
      .insert([{ name, owner_id: user.id }]);

    if (error) {
      console.error('Database Error:', error);
      return res.status(500).json({ error: 'Failed to create group' });
    }
    res
      .status(201)
      .json({ message: 'Group created successfully', group: data[0] });
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ error: 'Server error' });
  }
}
