import { hexToRgba } from '@/utility/hextoRgba';
import { Team } from '@/types';
interface PickCardProps {
  team: Team;
  changeSelection: (id: number) => void;
  selected: boolean;
}

const PickCard = ({ team, changeSelection, selected }: PickCardProps) => {
  const primaryRGBA = hexToRgba(team.primary_color, 1);
  const secondaryRGBA = hexToRgba(team.secondary_color, 1);

  console.log(primaryRGBA, secondaryRGBA);
  const cardClick = () => {
    console.log(`${team.name} clicked`);
    changeSelection(team.team_id);
  };

  return (
    <div
      className="flex-1 rounded-xl p-2"
      style={{
        background: selected
          ? `linear-gradient(to bottom, ${primaryRGBA}, ${secondaryRGBA})`
          : 'transparent',
      }}
    >
      <div
        className={`bg-white p-4 py-8 rounded-xl flex justify-center cursor-pointer hover:bg-gray-100`}
        onClick={() => cardClick()}
      >
        <p className="font-bold select-none">{team.name}</p>
      </div>
    </div>
  );
};

export default PickCard;
