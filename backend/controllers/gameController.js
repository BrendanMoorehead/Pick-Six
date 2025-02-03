//Implements the logic for handling API requests
import supabase from '../db.js';

export async function getGames(req, res) {
  try {
    const { data, error } = await supabase.from('nfl_games').select();
    console.log(data);
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ error: 'Server error' });
  }
}
