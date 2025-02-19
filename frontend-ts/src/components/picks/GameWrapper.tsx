import { useState } from 'react';
import PickCard from './PickCard';
import { Team, Pick, Game } from '@/types';
import { addPick } from '@/features/picks/pickSlice';
import { useDispatch, UseDispatch } from 'react-redux';

const GameWrapper = ({
  teams,
  pick,
  game,
}: {
  teams: Team[];
  pick: Pick;
  game: Game;
}) => {
  const [selectedTeam, setSelectedTeam] = useState<number | null>(pick?.pick);
  const dispatch = useDispatch();
  const changeSelection = (id: number, game: Game) => {
    setSelectedTeam(id);
    const pickDetails = {
      game_id: game.game_id,
      pick: id,
      group_id: 24,
      status: 'active',
    };
    dispatch(addPick(pickDetails));
  };

  return (
    <div className="flex gap-12 items-center justify-center w-full p-2 px-36">
      <PickCard
        changeSelection={() => changeSelection(teams[0].team_id, game)}
        selected={selectedTeam === teams[0].team_id ? true : false}
        team={teams[0]}
      />
      <p className="font-serif  text-xl">vs.</p>
      <PickCard
        changeSelection={() => changeSelection(teams[1].team_id, game)}
        team={teams[1]}
        selected={selectedTeam === teams[1].team_id ? true : false}
      />
    </div>
  );
};

export default GameWrapper;
