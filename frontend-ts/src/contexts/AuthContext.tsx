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
  const gamesLoading = useSelector((state: RootState) => state.games.loading);

  const groups = useSelector((state: RootState) => state.groups.groups);
  const groupsLoading = useSelector((state: RootState) => state.groups.loading);

  const teams = useSelector((state: RootState) => state.teams.teams);
  const teamsLoading = useSelector((state: RootState) => state.teams.loading);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
      if (data?.user) {
        if (!groups || Object.keys(groups).length === 0) {
          dispatch(fetchGroupsThunk());
        }
        if (!teams || Object.keys(teams).length === 0) {
          dispatch(fetchTeamsThunk());
        }
        if (!games || Object.keys(games).length === 0) {
          dispatch(fetchGamesThunk());
        }
      }
      setLoading(false);
    };
    checkUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session: Session | null) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const dispatch = useDispatch();
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
