import supabase from '../db.js';

export async function createGroup(req, res) {
  const { group_name } = req.body;
  if (!group_name)
    return res.status(400).json({ error: 'Group name is required' });
  try {
    const user = req.user.user;
    const { data, error } = await supabase
      .from('groups')
      .insert([{ group_name, created_by: user.id }])
      .select();

    if (error) {
      console.error('Database Error:', error);
      return res.status(500).json({ error: 'Failed to create group' });
    }
    const { data: member_data, error: member_error } = await supabase
      .from('group_members')
      .insert({ user_id: user.id, group_id: data[0].id, role: 'admin' })
      .select();
    res
      .status(201)
      .json({ message: 'Group created successfully', group: data[0] });
  } catch (error) {
    console.error('Server Error', error);
    res.status(500).json({ error: 'Server error' });
  }
}

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
  if (invite.length === 0)
    return res.status(400).json({ error: 'Invite not found' });
  const { data, error } = await supabase
    .from('invites')
    .delete()
    .eq('id', invite[0].id);
  res.status(200).json({
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
