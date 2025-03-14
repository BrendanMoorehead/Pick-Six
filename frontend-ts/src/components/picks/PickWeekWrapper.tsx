import { Pagination } from '@heroui/pagination';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTeams } from '@/features/teams/teamsSlice';
import { selectGames } from '@/features/games/gameSlice';
import { selectPicks } from '@/features/picks/pickSlice';
import GameWrapper from './GameWrapper';
import { Group } from '@/types';
import { useMemo } from 'react';
import { ScrollShadow } from '@heroui/scroll-shadow';
import SavedChip from './SavedChip';
import { organizeGamesByWeek } from '@/utility/organizeGamesByWeek';
import { FaLock, FaUnlock } from 'react-icons/fa6';
import { Tooltip } from '@heroui/tooltip';
import { selectTimeframes } from '@/features/timeframes/timeframesSlice';
import { current } from '@reduxjs/toolkit';
/**
 * PickWeekWrapper is a component that displays all NFL games for a given week.
 */
const PickWeekWrapper = ({ id, group }: { id: string; group: Group }) => {
  const teams = useSelector(selectTeams);
  const games = useSelector(selectGames);
  const picks = useSelector(selectPicks);
  const timeframes = useSelector(selectTimeframes);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  //Retrieve the group id from the url.

  //Filter the user's picks for the current group.
  const filteredPicks = useMemo(() => {
    return picks.filter((pick) => pick.group_id === Number(id));
  }, [picks, id]);

  const handlePageChange = (week: number) => {
    setSelectedWeek(week);
  };

  const gamesByWeek = organizeGamesByWeek(games, teams);

  const pickCount = picks.filter((pick) => {
    return gamesByWeek[selectedWeek].some(
      (game) => game.game_id === pick.game_id
    );
  }).length;
  const gameCount = gamesByWeek[selectedWeek].length;
  const currentTimeframe = timeframes.filter(
    (timeframe) =>
      timeframe.week === selectedWeek && timeframe.season_type === 1
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  const startDay = new Date(currentTimeframe[0].first_game_start);
  const startDate = formatDate(startDay);
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h4 className="font-serif text-4xl font-bold">{`WEEK ${selectedWeek}`}</h4>
      <div className="flex flex-row gap-4 pb-2">
        <SavedChip pickCount={pickCount} gameCount={gameCount} />
        <Pagination
          onChange={(id) => handlePageChange(id)}
          isCompact
          showControls
          initialPage={1}
          total={18}
          color="primary"
        />
        <div className="flex">
          <Tooltip
            content={
              currentTimeframe[0].has_started
                ? 'Picks for this week are locked'
                : `Picks lock on ${startDate}`
            }
          >
            <p className="text-gray-500 text-sm bg-gray-100 p-3 px-3 rounded-xl flex justify-center items-center drop-shadow-sm">
              {currentTimeframe[0].has_started ? <FaLock /> : <FaUnlock />}
            </p>
          </Tooltip>
        </div>
      </div>

      <ScrollShadow hideScrollBar className="h-[560px] w-full p-6">
        {gamesByWeek[selectedWeek]?.map((game) => {
          const pickForGame = filteredPicks.find(
            (pick) =>
              pick.game_id === game.game_id && pick.group_id === Number(id)
          );
          return (
            <GameWrapper
              key={game.game_id}
              matchup={[game.home_team, game.away_team]}
              pick={pickForGame}
              game={game}
              group_id={Number(id)}
              locked={currentTimeframe[0].has_started}
            />
          );
        })}
      </ScrollShadow>
    </div>
  );
};

export default PickWeekWrapper;
