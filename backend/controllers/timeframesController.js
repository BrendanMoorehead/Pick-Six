import supabase from '../db.js';
export async function getTimeframes(req, res) {
  try {
    const { data, error } = await supabase.from('timeframes').select();
    if (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: `Failed to get picks for group ${group_id}` });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ error: 'Server error' });
  }
}
