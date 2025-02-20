import { Game } from '../src/types/index';

export type GetGamesResponse = {
  success: boolean;
  games?: Game[];
  message?: string;
};

export async function fetchGames(
  token: string,
  season: number
): Promise<{ games: Game[] }> {
  if (!token) throw new Error('User not authenticated (fetchGames)');
  if (!season) throw new Error('Season parameter is required (fetchGames)');
  const response = await fetch(
    `http://localhost:5001/games/get?season=${season}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    console.log('Response Error: ', errorText);
    throw new Error(`Failed to fetch games: ${errorText}`);
  }
  const data: Game[] = await response.json();
  return { games: data };
}
