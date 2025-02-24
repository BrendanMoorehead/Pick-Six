import { Game, Team } from '../types';

type GamesByWeekArray = Record<
  number,
  (Game & { home_team: Team; away_team: Team })[]
>;

export function organizeGamesByWeek(games: Game[], teams: Team[]): GamesByWeekArray {
    if (!games || games.length === 0) {
      console.warn('No games available for organizing');
      return {};
    }
    const teamMap = new Map<number, Team>();
    teams.forEach((team) => teamMap.set(team.team_id, team));
    const maxWeek = Math.max(...games.map((game) => game.week));
    const gamesByWeek: GamesByWeekArray = new Array(maxWeek + 1).fill(
      undefined
    );
    for (const game of games) {
      if (Number(game.season_type) !== 1) continue;
      const homeTeam = teamMap.get(game.home_team_id);
      const awayTeam = teamMap.get(game.away_team_id);
      if (!homeTeam || !awayTeam) {
        console.warn(`Missing team info for game: ${game.id}`);
        continue;
      }
      if (!gamesByWeek[game.week]) {
        gamesByWeek[game.week] = [];
      }
      gamesByWeek[game.week]?.push({
        ...game,
        home_team: homeTeam,
        away_team: awayTeam,
      });
    }
    return gamesByWeek;
  }