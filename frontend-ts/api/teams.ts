import { Team } from '@/types';

export async function fetchTeams(token: string): Promise<{ teams: Team[] }> {
  if (!token) throw new Error('User not authenticated (fetchTeams)');
  console.log('Fetching teams with token:', token);
  const response = await fetch('http://localhost:5000/teams/get_teams', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
