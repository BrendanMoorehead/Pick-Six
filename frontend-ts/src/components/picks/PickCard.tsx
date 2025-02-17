import React from 'react';
import { Team } from '@/types';
interface PickCardProps {
  team: Team;
  changeSelection: (id: number) => void;
  selected: boolean;
}

const PickCard = ({ team, changeSelection, selected }: PickCardProps) => {
  const cardClick = () => {
    console.log(`${team.name} clicked`);
    changeSelection(team.team_id);
  };

  return (
    <div
      className={`bg-white p-4 rounded-xl flex justify-center cursor-pointer max-w-xs border-2 hover:bg-gray-100 ${selected ? 'border-rams-faded' : 'border-transparent'}`}
      onClick={() => cardClick()}
    >
      <p>{team.name}</p>
    </div>
  );
};

export default PickCard;
