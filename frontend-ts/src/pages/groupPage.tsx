import PickRateCard from '@/components/PickRateCard';
import {
  Pagination,
  PaginationItem,
  PaginationCursor,
} from '@heroui/pagination';
import { Tab, Tabs } from '@heroui/tabs';
import { ScrollShadow } from '@heroui/scroll-shadow';
import TeamRadioButton from '@/components/TeamRadioButton';
import { Radio, RadioGroup } from '@heroui/radio';
import PickCard from '@/components/picks/PickCard';
import { Team } from '@/types';
import GameWrapper from '@/components/picks/GameWrapper';
import { useSelector } from 'react-redux';
import { selectTeams } from '@/features/teams/teamsSlice';
import PickWeekWrapper from '@/components/picks/PickWeekWrapper';
interface GroupPageProps {
  name: string;
}

const GroupPage = (props: GroupPageProps) => {
  const teams = useSelector(selectTeams);

  const groupedTeams: Team[][] = [];

  for (let i = 0; i < teams.length; i += 2) {
    groupedTeams.push(teams.slice(i, i + 2));
  }
  const gamesArr = [];
  for (let i = 0; i < 16; i++) {
    gamesArr.push({ team1: 'test1', team2: 'test2' });
  }
  //Group Name
  return (
    <div className="h-full p-8 flex-1 bg-gray-100 flex-col flex gap-8">
      <div className="flex-col flex gap-2">
        <h1 className="font-serif text-4xl font-bold">
          {props.name.toUpperCase()}
        </h1>
        <h2 className="text-xl">{`Week 12`}</h2>
      </div>
      <div className="grid grid-cols-3 h-full">
        <div>
          <PickRateCard week={12} />
          <PickWeekWrapper />
        </div>
        <div className="flex flex-col items-center col-span-2 border-1 bg-white border-black gap-2">
          <h4 className="font-serif text-2xl font-bold">WEEKS</h4>
          <Pagination isCompact showControls initialPage={1} total={18} />
          <div className="flex items-center gap-4">
            <p className="rounded-xl bg-gray-100 p-3 text-gray-500 text-xs">
              0/16 Picks saved
            </p>
            <Tabs>
              <Tab title="Picks"></Tab>
              <Tab title="Leaderboard"></Tab>
            </Tabs>
          </div>
          <ScrollShadow
            hideScrollBar
            className="h-[560px] w-full p-6 bg-gray-200"
          >
            <div className="flex flex-col content-center ">
              {groupedTeams.map((pair, index) => (
                <GameWrapper key={index} teams={pair} />
              ))}
            </div>
          </ScrollShadow>
        </div>
      </div>
    </div>
  );
  //My Picks Component
};

export default GroupPage;
