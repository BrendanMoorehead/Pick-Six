import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from '@heroui/pagination';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTeams } from '@/features/teams/teamsSlice';
import { selectGames } from '@/features/games/gameSlice';
import { Game, Team } from '@/types';
const PickWeekWrapper = () => {
  const teams = useSelector(selectTeams);
  const games = useSelector(selectGames);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  //Games are passed to the PickWeekWrapper and the GameWrapper is populated from here.
  //User picks need to be fetched to populate too
  //Picks are uploaded on change from here, saved icon should be shown, potentially run a timer to group populate, timer resets on click
  const handlePageChange = (week: number) => {
    setSelectedWeek(week);
  };

  function organizeGamesByWeek(
    games: Game[],
    teams: Team[]
  ): Record<number, (Game & { home_team: Team; away_team: Team })[]> {
    const regularSeasonGames = games.filter((game) => game.season_type === 2);
    const teamMap = new Map<number, Team>();

    teams.forEach((team) => teamMap.set(team.team_id, team));
    const gamesByWeek: Record<
      number,
      (Game & { home_team: Team; away_team: Team })[]
    > = {};
    for (const game of regularSeasonGames) {
      const homeTeam = teamMap.get(game.home_team_id);
      const awayTeam = teamMap.get(game.away_team_id);
      if (!homeTeam || !awayTeam) {
        console.warn(`Missing team info for game: ${game.id}`);
        continue;
      }
      if (!gamesByWeek[game.week]) {
        gamesByWeek[game.week] = [];
      }
      gamesByWeek[game.week].push({
        ...game,
        home_team: homeTeam,
        away_team: awayTeam,
      });
    }
    return gamesByWeek;
  }

  const gamesByWeek = organizeGamesByWeek(games, teams);
  console.log(gamesByWeek[1]);
  return (
    <div>
      <Pagination
        onChange={(id) => handlePageChange(id)}
        isCompact
        showControls
        initialPage={1}
        total={18}
      />
      <p>{`Week ${selectedWeek}`}</p>
    </div>
  );
};

export default PickWeekWrapper;
