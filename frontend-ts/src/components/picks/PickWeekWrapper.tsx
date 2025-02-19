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
import GameWrapper from './GameWrapper';

type GamesByWeekArray = Record<
  number,
  (Game & { home_team: Team; away_team: Team })[]
>;

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

  function organizeGamesByWeek(games: Game[]): GamesByWeekArray {
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
      // console.log('gameloop', game);
      if (Number(game.season_type) !== 1) continue;
      const homeTeam = teamMap.get(game.home_team_id);
      const awayTeam = teamMap.get(game.away_team_id);
      if (!homeTeam || !awayTeam) {
        console.warn(`Missing team info for game: ${game.id}`);
        continue;
      }

      // console.log('stype 2');
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

  const gamesByWeek = organizeGamesByWeek(games);
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
      {gamesByWeek[selectedWeek]?.map((game) => {
        return (
          <GameWrapper
            key={game.game_id}
            teams={[game.home_team, game.away_team]}
          />
        );
      })}
    </div>
  );
};

export default PickWeekWrapper;
