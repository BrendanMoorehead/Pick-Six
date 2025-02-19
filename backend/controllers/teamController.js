import supabase from '../db.js';
export async function getTeams(req, res) {
  console.log('Fetching teams: getTeams()');
  const user_id = req.user?.id;
  if (!user_id)
    return res.status(401).json({ error: 'Unauthorized: No user ID found' });
  try {
    const { data, error } = await supabase.from('nfl_teams').select('*');
    if (error) return res.status(400).json({ error: 'Failed to get teams' });
    res.status(200).json(data);
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ error: 'Server error' });
  }
}
