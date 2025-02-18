import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from '@heroui/pagination';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTeams } from '@/features/teams/teamsSlice';
import { selectGames } from '@/features/games/gameSlice';
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
