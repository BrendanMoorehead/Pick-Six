import { useState } from 'react';
import PickCard from './PickCard';
import { Team } from '@/types';
const rams: Team = {
  id: 151,
  team_id: 32,
  name: 'Los Angeles Rams',
  conference: 'NFC',
  division: 'West',
  primary_color: '#003594',
  secondary_color: '#ffd100',
};
const seahawks: Team = {
  id: 151,
  team_id: 30,
  name: 'Seattle Seahawks',
  conference: 'NFC',
  division: 'West',
  primary_color: '#002244',
  secondary_color: '#69BE28',
};

const GameWrapper = () => {
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);

  const changeSelection = (id: number) => {
    setSelectedTeam(id);
  };

  return (
    <div className="flex gap-4 items-center">
      <PickCard
        changeSelection={changeSelection}
        selected={selectedTeam === rams.team_id ? true : false}
        team={rams}
      />
      <p>vs.</p>
      <PickCard
        changeSelection={changeSelection}
        team={seahawks}
        selected={selectedTeam === seahawks.team_id ? true : false}
      />
    </div>
  );
};

export default GameWrapper;
