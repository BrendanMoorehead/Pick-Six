import { useState } from 'react';
import PickCard from './PickCard';
import { Team, Pick, Game } from '@/types';
import { addPick, makePicksThunk } from '@/features/picks/pickSlice';
import { useDispatch, UseDispatch } from 'react-redux';
import { CreatePicksRequest } from '../../../api/picks';
import { AppDispatch } from '@/app/store';
import { supabase } from '../../../supabaseClient';
const GameWrapper = ({
  teams,
  pick,
  game,
  group_id,
}: {
  teams: Team[];
  pick: Pick;
  game: Game;
  group_id: number;
}) => {
  const [selectedTeam, setSelectedTeam] = useState<number | null>(pick?.pick);
  const dispatch = useDispatch<AppDispatch>();
  const getUserId = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error('Error fetching user:', error);
      return null; // Handle error as appropriate
    }

    return user?.id; // Return user ID or null if no user is authenticated
  };

  const changeSelection = (id: number, game: Game) => {
    setSelectedTeam(id);
    const pickDetails: Pick = {
      game_id: game.game_id,
      pick: id,
      group_id: group_id,
      status: 'active',
    };
    dispatch(addPick(pickDetails));

    const pickRequest: CreatePicksRequest = {
      picks: [pickDetails], // Wrap pickDetails in an array to match CreatePicksRequest
    };
    dispatch(makePicksThunk(pickRequest));
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
