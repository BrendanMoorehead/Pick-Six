import { Team } from '../src/types/index';
export async function fetchTeams(token: string): Promise<{ teams: Team[] }> {
  if (!token) throw new Error('User not authenticated (fetchTeams)');
  console.log('Fetching teams with token:', token);
  const response = await fetch('http://localhost:5000/teams/get_teams', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.log('Response Error:', errorText);
    throw new Error(`Failed to fetch teams: ${errorText}`);
  }
  const data: Team[] = await response.json();
  console.log('Fetched Response:', data);
  return { teams: data };
}
