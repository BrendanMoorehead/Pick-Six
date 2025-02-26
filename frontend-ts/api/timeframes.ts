import { Timeframe } from '../src/types/index';
export async function fetchTimeframes(
  token: string
): Promise<{ timeframes: Timeframe[] }> {
  if (!token) throw new Error('User not authenticated (fetchTimeframes)');
  const response = await fetch(
    'http://localhost:5001/timeframes/get_timeframes',
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
    throw new Error(`Failed to fetch timeframes: ${errorText}`);
  }
  const data: Timeframe[] = await response.json();
  console.log('Fetched Response:', data);
  return { timeframes: data };
}
