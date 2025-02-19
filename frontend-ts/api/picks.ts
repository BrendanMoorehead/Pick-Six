import { Pick } from '../src/types';
export type CreatePicksRequest = {
  picks: Pick[];
};
export type CreatePicksResponse = {
  success: boolean;
  message?: string;
};

export async function makePicks(
  data: CreatePicksRequest,
  token: string
): Promise<CreatePicksResponse> {
  console.log('Making picks (frontend)');
  console.log(data);
  const response = await fetch('http://localhost:5000/picks/batch_make', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    console.log(response);
    throw new Error('Failed to create picks');
  }
  return response.json();
}

export async function fetchPicks(
  token: string,
  group_id: number
): Promise<{ picks: Pick[] }> {
  if (!token) throw new Error('User not authenticated (fetchPicks)');
  console.log('Fetching picks with token:', token);
  const response = await fetch(
    `http://localhost:5000/picks/group_picks?group_id=${group_id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.log('Response Error:', errorText);
    throw new Error(`Failed to fetch groups: ${errorText}`);
  }
  const data: Pick[] = await response.json();
  console.log('Fetched Response:', data);
  return { picks: data };
}
