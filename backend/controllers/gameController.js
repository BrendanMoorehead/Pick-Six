//Implements the logic for handling API requests
import supabase from '../db.js';

export async function getGames(req, res) {
  const season = req.query.season;
  if (!season) return res.status(400).json({ error: 'Missing parameters' });
  try {
    const { data, error } = await supabase.rpc('get_nfl_games_with_teams', {
      season_param: season,
    });
    if (error)
      return res
        .status(400)
        .json({ error: `Failed to get nfl games for ${season} season` });
    res.status(200).json(data);
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ error: 'Server error' });
  }
}
