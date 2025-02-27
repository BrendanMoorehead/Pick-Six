import { useState } from 'react';
import PickCard from './PickCard';
import { Team, Pick, Game } from '@/types';
import { addPick, makePicksThunk } from '@/features/picks/pickSlice';
import { useDispatch } from 'react-redux';
import { CreatePicksRequest } from '../../../api/picks';
import { AppDispatch } from '@/app/store';

/**
 * GameWrapper is a component that displays a game and allows the user to select a match winner.
 * @param matchup - an array of two teams, playing against each other.
 * @param pick - The pick for the game.
 * @param game - The game object.
 * @param group_id - The group ID for the pick.
 * @returns
 */
const GameWrapper = ({
  matchup,
  pick,
  game,
  group_id,
  locked,
}: {
  matchup: Team[];
  pick: Pick;
  game: Game;
  group_id: number;
  locked: boolean;
}) => {
  const [selectedTeam, setSelectedTeam] = useState<number | null>(pick?.pick);
  const dispatch = useDispatch<AppDispatch>();

  //TODO: Add a timer to to the dispatch of thunks, so that picks can be batched.
  const changeSelection = (id: number, game: Game) => {
    setSelectedTeam(id);
    const pickDetails: Pick = {
      game_id: game.game_id,
      pick: id,
      group_id: group_id,
      status: 'active',
    };
    //Add the pick to the store.
    dispatch(addPick(pickDetails));
    //Convert the pick to a CreatePicksRequest, as makePicksThunk expects it.
    const pickRequest: CreatePicksRequest = {
      picks: [pickDetails],
    };
    //Dispatch the thunk to update the pick in the database.
    dispatch(makePicksThunk(pickRequest));
  };

  return (
    <div className="flex gap-12 items-center justify-center w-full p-2 px-36">
      <PickCard
        changeSelection={() => changeSelection(matchup[0].team_id, game)}
        selected={selectedTeam === matchup[0].team_id ? true : false}
        team={matchup[0]}
        locked={locked}
        pick={pick}
      />
      <p className="font-serif  text-xl">vs.</p>
      <PickCard
        changeSelection={() => changeSelection(matchup[1].team_id, game)}
        team={matchup[1]}
        selected={selectedTeam === matchup[1].team_id ? true : false}
        locked={locked}
        pick={pick}
      />
    </div>
  );
};

export default GameWrapper;
