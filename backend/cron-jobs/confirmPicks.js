import { queryUnresolvedPicks, queryScores } from './database.js';
import supabase from '../db.js';
export async function confirmPicks() {
  const unresolvedPicks = await queryUnresolvedPicks();
  const scores = await queryScores();
  console.log(scores);

  const updatedPicks = unresolvedPicks
    .map((pick) => {
      const game = scores.find((score) => score.game_id === pick.game_id);
      if (!game) return;
      if (!game.winner && (game.status === 'Final' || game.status === 'F/OT')) {
        return {
          ...pick,
          result: false,
          status: 'confirmed',
        };
      }
      return {
        ...pick,
        result: pick.pick === game.winner,
        status: 'confirmed',
      };
    })
    .filter(Boolean);
  console.log(updatedPicks);
  await batchConfirmedPicks(updatedPicks);
}

export async function batchConfirmedPicks(picks) {
  console.log('Batching confirmed picks to DB...');
  try {
    const { data, error } = await supabase
      .from('user_picks')
      .upsert(picks, { onConflict: ['game_id', 'group_id', 'made_by'] })
      .select();

    console.log(data);
    if (error) throw error;
    console.log('Batched confirmed picks successfully');
  } catch (error) {
    console.log('Failed to batch confirm picks: ', error);
  }
}

confirmPicks();
