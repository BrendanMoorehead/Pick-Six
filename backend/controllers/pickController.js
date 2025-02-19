import supabase from '../db.js';

/**
 * @route POST /picks/make
 * @desc Submit a pick for a given game
 * @access Private (Requires authentication)
 * @param {Object} req.body - The request body
 * @param {string} req.body.user_id - The active user's id
 * @param {string} req.body.group_id - The group for which the pick is made
 * @param {string} req.body.game_id - The game for which the pick is made
 * @param {string} req.body.pick - The id of the team picked
 * @returns {Object} 201 - Pick made successfully
 * @returns {Object} 400 - Missing required fields
 * @returns {Object} 500 - Server error
 */
export async function makePick(req, res) {
  const { user_id, group_id, game_id, pick } = req.body;
  if (!user_id || !group_id || !game_id || !pick)
    return res.status(400).json({ error: 'Missing parameters' });
  try {
    const { data, error } = await supabase
      .from('user_picks')
      .upsert({
        made_by: user_id,
        game_id,
        pick,
        group_id,
        status: 'active',
      })
      .select();
    if (error) {
      console.error('Database error');
      return res.status(500).json({ error: 'Error when making pick' });
    }
    res.status(201).json({ message: 'Pick made', data: data });
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function batchPicks(req, res) {
  const { picks } = req.body;

  if (!picks || !Array.isArray(picks))
    return res.status(400).json({ error: 'Invalid data format' });

  console.log(picks);
  const updatedPicks = picks.map((pick) => {
    return {
      made_by: pick.user_id,
      game_id: pick.game_id,
      pick: pick.pick,
      group_id: pick.group_id,
      status: 'active',
    };
  });
  console.log('Updated Picks:', JSON.stringify(updatedPicks, null, 2));
  try {
    const { data, error } = await supabase
      .from('user_picks')
      .upsert(updatedPicks, { onConflict: ['game_id', 'group_id', 'made_by'] })
      .select();

    console.log(data);
    if (error) throw error;
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}

/**
 * @route GET /picks/group_picks
 * @desc Get all picks for a group
 * @access Private (Requires authentication)
 * @param {Object} req.query - The request query
 * @param {string} req.query.group_id - The group for which to get the picks
 * @returns {Object} 200 - Pick fetched successfully
 * @returns {Object} 400 - Missing required fields
 * @returns {Object} 500 - Server error
 */
export async function getGroupPicks(req, res) {
  const group_id = req.query.group_id;
  if (!group_id)
    return res.status(400).json({ error: 'Missing required data' });
  try {
    const { data, error } = await supabase
      .from('user_picks')
      .select()
      .eq('group_id', group_id);
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
