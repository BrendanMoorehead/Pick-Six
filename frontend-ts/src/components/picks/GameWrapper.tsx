import { useState } from 'react';
import PickCard from './PickCard';
import { Team } from '@/types';
// const rams: Team = {
//   id: 151,
//   team_id: 32,
//   name: 'Los Angeles Rams',
//   conference: 'NFC',
//   division: 'West',
//   primary_color: '#003594',
//   secondary_color: '#ffd100',
// };
// const seahawks: Team = {
//   id: 151,
//   team_id: 30,
//   name: 'Seattle Seahawks',
//   conference: 'NFC',
//   division: 'West',
//   primary_color: '#002244',
//   secondary_color: '#69BE28',
// };

const GameWrapper = ({ teams }: { teams: Team[] }) => {
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);

  const changeSelection = (id: number) => {
    setSelectedTeam(id);
  };

  return (
    <div className="flex gap-12 items-center justify-center w-full p-2 px-36">
      <PickCard
        changeSelection={changeSelection}
        selected={selectedTeam === teams[0].team_id ? true : false}
        team={teams[0]}
      />
      <p className="font-serif  text-xl">vs.</p>
      <PickCard
        changeSelection={changeSelection}
        team={teams[1]}
        selected={selectedTeam === teams[1].team_id ? true : false}
      />
    </div>
  );
};

export default GameWrapper;
