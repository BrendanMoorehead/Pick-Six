export type CreateGroupRequest = {
  group_name: string;
};

export type CreateGroupResponse = {
  success: boolean;
  groupId?: string;
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
