import { Group, Member } from '@/types';

export type CreateGroupRequest = {
  group_name: string;
};

export type CreateGroupResponse = {
  success: boolean;
  groupId?: string;
  message?: string;
};

export type GetGroupsRequest = {
  user_id: string;
};

export type GetGroupsResponse = {
  success: boolean;
  groups?: Group[];
  message?: string;
};
interface MembersResponse {
  members: Member[]; // Replace 'any' with the appropriate type for members
}

export async function createGroup(
  data: CreateGroupRequest,
  token: string
): Promise<CreateGroupResponse> {
  console.log(data, token);
  const response = await fetch('http://localhost:5001/groups/create', {
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

export async function fetchGroups(token: string): Promise<{ groups: Group[] }> {
  if (!token) throw new Error('User not authenticated (fetchGroups)');
  console.log('Fetching groups with token:', token);
  const response = await fetch('http://localhost:5001/groups/get_groups', {
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
  const data: Group[] = await response.json();
  console.log('Fetched Response:', data);
  return { groups: data };
}

export async function fetchGroupMembers(
  group_id: bigint,
  token: string
): Promise<MembersResponse> {
  if (!token) throw new Error('User not authenticated (fetchGroupMembers)');
  const response = await fetch(
    `http://localhost:5001/groups/info?group_id=${group_id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    console.log('Response Error:', errorText);
    throw new Error(`Failed to fetch group members: ${errorText}`);
  }
  const data = await response.json();

  const responseData = data.data;
  console.log('Fetched Members:', responseData);
  return responseData[0];
}
