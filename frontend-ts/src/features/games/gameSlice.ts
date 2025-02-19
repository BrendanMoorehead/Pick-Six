import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Game } from '@/types';
import { getToken } from '../../../services/auth';
import { RootState } from '@/app/store';
import { fetchGames } from '../../../api/games';
export interface GameState {
  games: Game[];
  loading: boolean;
  error: string | null;
}

const initialState: GameState = {
  games: [],
  loading: false,
  error: null,
};

export const fetchGamesThunk = createAsyncThunk(
  'games/fetchGames',
  async (): Promise<Game[]> => {
    try {
      const token = await getToken();
      const response = await fetchGames(token, 2024);
      return response.games as Game[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    resetGames: () => initialState,
    setGames: (state, action: PayloadAction<Game[]>) => {
      state.games = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGamesThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchGamesThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.games = (action.payload as Game[]) || [];
    });
    builder.addCase(fetchGamesThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch games';
    });
  },
});

export const selectGames = (state: RootState) => state.games.games;
export const { setGames, resetGames } = gameSlice.actions;
export default gameSlice.reducer;
