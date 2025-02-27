import { hexToRgba } from '@/utility/hextoRgba';
import { Team, Pick } from '@/types';
interface PickCardProps {
  team: Team;
  changeSelection: (id: number) => void;
  selected: boolean;
  locked: boolean;
  pick: Pick;
}

const PickCard = ({
  team,
  changeSelection,
  selected,
  locked,
  pick,
}: PickCardProps) => {
  const primaryRGBA = hexToRgba(team.primary_color, 1);
  const secondaryRGBA = hexToRgba(team.secondary_color, 1);

  const cardClick = () => {
    if (!locked) changeSelection(team.team_id);
  };

  return (
    <div
      className="flex-1 rounded-xl p-2 shadow-lg"
      style={{
        background: selected
          ? `linear-gradient(to bottom, ${primaryRGBA}, ${secondaryRGBA})`
          : 'transparent',
      }}
    >
      <div
        className={` p-4 py-8 rounded-xl flex justify-center 
          ${locked ? 'bg-gray-200 cursor-not-allowed' : 'hover:bg-gray-100 bg-white cursor-pointer '}
          ${pick?.result && locked && selected && 'bg-green-500'}
          ${pick?.result === false && locked && selected && 'bg-red-500'}
          `}
        onClick={() => cardClick()}
      >
        <p className="font-bold select-none">{team.name}</p>
      </div>
    </div>
  );
};

export default PickCard;
