import supabase from '../db.js';

/**
 * @route POST /groups/create
 * @desc Creates a new group
 * @access Private (Requires authentication)
 * @param {Object} req.body - The request body
 * @param {string} req.body.group_name - The name of the group
 * @returns {Object} 201 - Group created successfully
 * @returns {Object} 400 - Missing required fields
 * @returns {Object} 500 - Server error
 */
export async function createGroup(req, res) {
  const { group_name } = req.body;
  if (!group_name)
    return res.status(400).json({ error: 'Missing required fields' });
  try {
    const user = req.user.user;
    const { data, error } = await supabase
      .from('groups')
      .insert([{ group_name, created_by: user.id }])
      .select();

    if (error) {
      console.error('Database Error:', error);
      return res.status(500).json({ error: 'Failed to insert group' });
    }
    const { error: member_error } = await supabase
      .from('group_members')
      .insert({ user_id: user.id, group_id: data[0].id, role: 'admin' });
    if (member_error) {
      console.error('Database Error:', member_error);
      return res
        .status(500)
        .json({ error: 'Failed to insert self as group member' });
    }
    res
      .status(201)
      .json({ message: 'Group created successfully', group: data[0] });
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ error: 'Server error' });
  }
}

/**
 * @route POST /groups/delete
 * @desc Deletes a group
 * @access Private (Requires authentication)
 * @param {Object} req.query - The request query
 * @param {string} req.query.group_id - The id of the group to delete
 * @returns {Object} 204 - Group deleted successfully
 * @returns {Object} 400 - Missing required fields
 * @returns {Object} 404 - Group does not exist
 * @returns {Object} 500 - Server error
 */
export async function deleteGroup(req, res) {
  const group_id = req.query.group_id;
  if (!group_id)
    return res.status(400).json({ error: 'Missing required fields' });
  try {
    const { data, error } = await supabase
      .from('groups')
      .delete()
      .eq('id', group_id)
      .select();
    if (error) return res.status(500).json({ error: 'Failed to find group' });
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Group does not exist' });
    }
    res.status(204).json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ error: 'Server error' });
  }
}

/**
 * @route POST /groups/remove_user
 * @desc Removes a user from a group
 * @access Private (Requires authentication)
 * @param {Object} req.query - The request query
 * @param {string} req.query.group_id - The id of the group to remove user from
 * @param {string} req.query.user_id - The id of the user to remove from the group
 * @returns {Object} 204 - Member removed successfully
 * @returns {Object} 400 - Missing required fields
 * @returns {Object} 404 - Failed to find group member
 * @returns {Object} 500 - Server error
 */
export async function removeUser(req, res) {
  const { group_id, user_id } = req.query;
  if (!group_id || !user_id)
    return res.status(400).json({ error: 'Missing required fields' });
  try {
    const { data, error } = await supabase
      .from('group_members')
      .delete()
      .eq('group_id', group_id)
      .eq('user_id', user_id)
      .select();
    if (error)
      return res
        .status(500)
        .json({ error: 'Failed to remove user from group' });
    if (!data || data.length === 0)
      return res.status(404).json({ message: 'Failed to find group member' });
    return res.status(204).json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ error: 'Server error' });
  }
}

/**
 * @route POST /groups/decline
 * @desc Deletes an invite
 * @access Private (Requires authentication)
 * @param {Object} req.body - The request body
 * @param {string} req.body.group_id - The id of the invite to delete
 * @param {string} req.body.user_id - The id of the user who got the invite
 * @returns {Object} 204 - Group deleted successfully
 * @returns {Object} 400 - Missing required fields
 * @returns {Object} 404 - Group does not exist
 * @returns {Object} 500 - Server error
 */
export async function declineInvite(req, res) {
  const { group_id, user_id } = req.body;
  if (!group_id || !user_id)
    return res.status(400).json({ error: 'Invite details required' });
  const { data: invite, error: invite_error } = await supabase
    .from('invites')
    .select()
    .eq('group_id', group_id)
    .eq('user_id', user_id)
    .select();
  if (invite_error)
    return res.status(500).json({ error: 'Failed to find invite' });
  if (invite.length === 0)
    return res.status(404).json({ error: 'Failed to find invite' });
  const { data, error } = await supabase
    .from('invites')
    .delete()
    .eq('id', invite[0].id);
  res.status(204).json({
    message: 'Invite removed',
  });
  try {
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function acceptInvite(req, res) {
  const { group_id, user_id } = req.body;
  if (!group_id || !user_id)
    return res.status(400).json({ error: 'Invite details required' });
  try {
    const { data: invite, error: invite_error } = await supabase
      .from('invites')
      .select()
      .eq('group_id', group_id)
      .eq('user_id', user_id)
      .select();
    if (invite.length === 0)
      return res.status(400).json({ error: 'Invite not found' });
    const { data: group, error: group_error } = await supabase
      .from('group_members')
      .insert([
        {
          user_id: user_id,
          group_id: group_id,
          role: 'member',
        },
      ])
      .select();
    const { data, error } = await supabase
      .from('invites')
      .delete()
      .eq('id', invite[0].id);
    res.status(201).json({
      message: 'Invite accepted',
      data: invite,
    });
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getInvites(req, res) {
  const user_id = req.query.user_id;
  if (!user_id) return res.status(400).json({ error: 'User id is required' });
  try {
    const { data, error } = await supabase
      .from('invites')
      .select()
      .eq('user_id', user_id);

    if (error)
      return res.status(400).json({ error: 'Failed to get group invites' });
    res.status(200).json(data);
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getGroups(req, res) {
  const user_id = req.query.user_id;
  if (!user_id) return res.status(400).json({ error: 'User id is required' });
  try {
    const { data, error } = await supabase
      .from('group_members')
      .select('group_id')
      .eq('user_id', user_id);
    console.log(data);
    if (error)
      return res
        .status(400)
        .json({ error: 'Failed to get group ids for member' });
    const group_ids = data.map((group) => group.group_id);
    console.log(group_ids);
    const { data: groups, error: groups_error } = await supabase
      .from('groups')
      .select('*')
      .in('id', group_ids);
    if (groups_error)
      return res.status(400).json({ error: 'Failed to get groups' });
    res.status(200).json(groups);
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function getGroupInfo(req, res) {
  const group_id = req.query.group_id;
  if (!group_id)
    return res.status(400).json({ error: 'Missing required data' });
  try {
    const { data, error } = await supabase.rpc('get_group_with_members', {
      group_id_input: group_id,
    });

    console.log(data);
    res.status(201).json({
      message: 'Group details fetched',
      data: data,
    });
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ error: 'Server error' });
  }
}

export async function inviteToGroup(req, res) {
  const { group_id, invited_user_id, sending_user_id } = req.body;
  if (!group_id || !invited_user_id)
    return res.status(400).json({ error: 'All fields required' });
  try {
    const { data: group, error: group_error } = await supabase
      .from('groups')
      .select()
      .eq('created_by', sending_user_id)
      .eq('id', group_id)
      .select();
    if (!group)
      return res.status(400).json({ error: "User doesn't own the group" });

    const { data: existing_user, error: user_fetch_error } = await supabase
      .from('users')
      .select('id')
      .eq('id', invited_user_id)
      .single();
    if (user_fetch_error)
      return res.status(500).json({ error: user_fetch_error });
    if (!existing_user)
      return res.status(400).json({ error: 'User not found' });

    const { count, error: existing_invite_error } = await supabase
      .from('invites')
      .select('*', { count: 'exact', head: true }) // ✅ Correct way to count rows
      .eq('group_id', group_id)
      .eq('user_id', invited_user_id);

    if (existing_invite_error) {
      console.error('❌ Supabase Error:', existing_invite_error);
    } else {
      console.log('✅ Matching Invite Count:', count);
    }
    console.log(existing_invite_error);
    if (count === 1)
      return res
        .status(400)
        .json({ error: 'There is an existing invite for this user' });

    const { data, error } = await supabase
      .from('invites')
      .insert([{ group_id, user_id: invited_user_id }])
      .select();

    if (error) {
      console.error('Database error');
      return res.status(500).json({ error: 'Failed to invite user to group' });
    }
    res.status(201).json({
      message: 'Invite sent successfully',
      data: data,
    });
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ error: 'Server error' });
  }
}
