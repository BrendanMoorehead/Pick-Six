import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from '@heroui/pagination';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTeams } from '@/features/teams/teamsSlice';
import { selectGames } from '@/features/games/gameSlice';
import { selectPicks } from '@/features/picks/pickSlice';
import { Game, Team } from '@/types';
import GameWrapper from './GameWrapper';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
type GamesByWeekArray = Record<
  number,
  (Game & { home_team: Team; away_team: Team })[]
>;

const PickWeekWrapper = () => {
  const teams = useSelector(selectTeams);
  const games = useSelector(selectGames);
  const picks = useSelector(selectPicks);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  //Get the group id for uploading picks.
  const { id } = useParams();
  useEffect(() => {
    // You might want to fetch new picks or perform other actions here
    console.log(`Group ID changed: ${Number(id)}`);
    // Example: dispatch(fetchPicksForGroup(Number(id)));
  }, [id]);
  const filteredPicks = useMemo(() => {
    return picks.filter((pick) => pick.group_id === Number(id));
  }, [picks, id]);
  console.log(id);
  //Games are passed to the PickWeekWrapper and the GameWrapper is populated from here.
  //User picks need to be fetched to populate too
  //Picks are uploaded on change from here, saved icon should be shown, potentially run a timer to group populate, timer resets on click
  const handlePageChange = (week: number) => {
    setSelectedWeek(week);
  };

  const savePick = () => {
    //Pick: made_by, pick (team id), group_id
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
        const pickForGame = filteredPicks.find(
          (pick) =>
            pick.game_id === game.game_id && pick.group_id === Number(id)
        );
        return (
          <GameWrapper
            key={game.game_id}
            teams={[game.home_team, game.away_team]}
            pick={pickForGame}
            game={game}
            group_id={Number(id)}
          />
        );
      })}
    </div>
  );
};

export default PickWeekWrapper;
