import { Button } from '@heroui/button';
import { supabase } from '../../supabaseClient';
import { useDispatch } from 'react-redux';
import { resetGames } from '@/features/games/gameSlice';
import { resetTeams } from '@/features/teams/teamsSlice';
import { resetGroups } from '@/features/groups/groupSlice';
import { persistor } from '../../src/app/store';
import { resetPicks } from '@/features/picks/pickSlice';

export default function LogoutButton() {
  const dispatch = useDispatch();
  const handlePress = () => {
    dispatch(resetGames());
    dispatch(resetTeams());
    dispatch(resetGroups());
    dispatch(resetPicks());
    persistor.flush();
    supabase.auth.signOut();
  };
  return (
    <Button variant="ghost" onPress={handlePress}>
      Logout
    </Button>
  );
}
