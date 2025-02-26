import { queryUnresolvedPicks, queryScores } from './database.js';
export async function confirmPicks() {
  const unresolvedPicks = await queryUnresolvedPicks();
  const scores = await queryScores();

  unresolvedPicks.map((pick) => {
    const game = scores.find((score) => score.game_id === pick.game_id);
    if ()
  });
}

confirmPicks();
