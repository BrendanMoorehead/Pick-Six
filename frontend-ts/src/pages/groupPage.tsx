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
interface GroupPageProps {
  name: string;
}

const GroupPage = (props: GroupPageProps) => {
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
          <RadioGroup orientation="horizontal">
            <TeamRadioButton
              description="Las Vegas Raiders"
              value="1"
              teamColor="red-500"
            />
            <p className="self-center">vs.</p>
            <TeamRadioButton
              description="Baltimore Ravens"
              value="2"
              teamColor="primary"
            />
          </RadioGroup>
          <GameWrapper />
        </div>
        <div className="flex flex-col items-center col-span-2 border-1 bg-white border-black gap-2">
          <h4 className="font-serif text-2xl font-bold">WEEKS</h4>
          <Pagination isCompact showControls initialPage={1} total={18} />
          <Tabs>
            <Tab title="Picks"></Tab>
            <Tab title="Leaderboard"></Tab>
          </Tabs>
          <ScrollShadow hideScrollBar className="h-[560px]">
            {/* {gamesArr.map((game) => {
              return (
                <div className="flex gap-12">
                  <div className="h-24 w-50 bg-red-500">{game.team1}</div>
                  <div className="h-24 w-50 bg-red-500">{game.team2}</div>
                </div>
              );
            })} */}
          </ScrollShadow>
        </div>
      </div>
    </div>
  );
  //My Picks Component
};

export default GroupPage;
