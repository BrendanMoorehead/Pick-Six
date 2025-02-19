import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { supabase } from '../../supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import { fetchGroupsThunk } from '@/features/groups/groupSlice';
import { fetchTeamsThunk } from '@/features/teams/teamsSlice';
import { fetchGamesThunk } from '@/features/games/gameSlice';
import { fetchPicksThunk } from '@/features/picks/pickSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/app/store';
import { RootState } from '@/app/store';
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const games = useSelector((state: RootState) => state.games.games);
  const groups = useSelector((state: RootState) => state.groups.groups);
  const teams = useSelector((state: RootState) => state.teams.teams);
  const picks = useSelector((state: RootState) => state.picks.picks);
  useEffect(() => {
    let isMounted = true;
    const checkUser = async () => {
      if (!isMounted) return;
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
      setLoading(false);
    };
    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session: Session | null) => {
        if (!isMounted) return;
        console.log('Auth state changed:', session?.user);
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      if (groups.length === 0) dispatch(fetchGroupsThunk());
      if (teams.length === 0) dispatch(fetchTeamsThunk());
      if (games.length === 0) dispatch(fetchGamesThunk());
      if (picks.length === 0) dispatch(fetchPicksThunk(24));
    }
  }, [user, dispatch, games.length, groups.length, teams.length, picks.length]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
