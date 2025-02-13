export type CreateGroupRequest = {
  group_name: string;
};

export type CreateGroupResponse = {
  success: boolean;
  groupId?: string;
  message?: string;
};

export type Group = {
  id: string;
  name: string;
};

export type GetGroupsRequest = {
  user_id: string;
};

export type GetGroupsResponse = {
  success: boolean;
  groups?: Group[];
  message?: string;
};

export async function createGroup(
  data: CreateGroupRequest,
  token: string
): Promise<CreateGroupResponse> {
  console.log(data, token);
  const response = await fetch('http://localhost:5000/groups/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log(response);
    throw new Error('Failed to create group');
  }
  return response.json();
}

export async function fetchGroups(token: string): Promise<GetGroupsResponse> {
  if (!token) throw new Error('User not authenticated (fetchGroups)');
  console.log('Fetching groups with token:', token);
  const response = await fetch('http://localhost:5000/groups/get_groups', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.log('Response Error:', errorText);
    throw new Error(`Failed to fetch groups: ${errorText}`);
  }

  return response.json();
}
