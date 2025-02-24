import PickRateCard from '@/components/PickRateCard';
import { Team } from '@/types';
import { useSelector } from 'react-redux';
import { selectTeams } from '@/features/teams/teamsSlice';
import { selectGroups } from '@/features/groups/groupSlice';
import PickWeekWrapper from '@/components/picks/PickWeekWrapper';
import { useParams } from 'react-router-dom';
import { getCountPicks } from '@/utility/getCountPicks';
import { selectPicks } from '@/features/picks/pickSlice';
import { Card } from '@heroui/card';
import Leaderboard from '@/components/Leaderboard';
import { Pagination } from '@heroui/pagination';
const GroupPage = () => {
  const { id } = useParams();
  const groups = useSelector(selectGroups);
  const teams = useSelector(selectTeams);
  const picks = useSelector(selectPicks);

  const group = groups.find((g) => g.id.toString() === id);
  if (!group) {
    return <p className="text-center text-red-500">Group not found.</p>;
  }

  const groupedTeams: Team[][] = [];

  for (let i = 0; i < teams.length; i += 2) {
    groupedTeams.push(teams.slice(i, i + 2));
  }
  const gamesArr = [];
  for (let i = 0; i < 16; i++) {
    gamesArr.push({ team1: 'test1', team2: 'test2' });
  }
  const { correctPicks, totalPicks } = getCountPicks(picks);
  //Group Name
  return (
    <div className="w-full h-full p-8 flex-1 bg-gray-100 flex-col flex gap-8">
      <div className="flex-col flex gap-2">
        <h1 className="font-serif text-4xl font-bold">
          {group.group_name.toUpperCase()}
        </h1>
        <h2 className="text-xl">{`Week 12`}</h2>
      </div>
      <div className="grid grid-cols-3 h-full gap-12">
        <div className="flex flex-col gap-8">
          <PickRateCard week={12} correctPicks={correctPicks} totalPicks={totalPicks} />
          <Card className="flex flex-col items-center col-span-2 bg-white rounded-xl gap-4 p-8">
            <p className="font-serif text-2xl font-bold">LEADERBOARD</p>
            <Pagination
        onChange={() => (console.log('hello'))}
        isCompact
        showControls
        initialPage={1}
        total={18}
        color="primary"
      />
            <Leaderboard />
          </Card>
        </div>
        <Card className="flex flex-col items-center col-span-2 bg-white rounded-xl gap-2 p-8">
          <div className="flex flex-col content-center ">
            <PickWeekWrapper key={id} id={id} group={group} />
          </div>
        </Card>
      </div>
    </div>
  );
  //My Picks Component
};

export default GroupPage;
