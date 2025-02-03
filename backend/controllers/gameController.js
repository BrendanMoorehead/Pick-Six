//Implements the logic for handling API requests
import supabase from '../db.js';

/**
 * @route GET /games/get
 * @desc Gets all games for a given season and their team details.
 * @access Private (Requires authentication)
 * @param {Object} req.query - The request query
 * @param {string} req.query.season - The season for getting games
 * @returns {Object} 200 - Game data fetched successfully
 * @returns {Object} 400 - Missing required fields
 * @returns {Object} 500 - Server error
 */
export async function getGames(req, res) {
  const season = req.query.season;
  if (!season) return res.status(400).json({ error: 'Missing parameters' });
  try {
    const { data, error } = await supabase.rpc('get_nfl_games_with_teams', {
      season_param: season,
    });
    if (error)
      return res
        .status(500)
        .json({ error: `Failed to get nfl games for ${season} season` });
    res.status(200).json(data);
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ error: 'Server error' });
  }
}
