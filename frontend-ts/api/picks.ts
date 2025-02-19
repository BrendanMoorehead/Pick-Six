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
  console.log('Pick data:', data);
  const response = await fetch('http://localhost:500/picks/batch_make', {
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
