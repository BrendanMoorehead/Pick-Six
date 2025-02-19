import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Team } from '@/types';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { getToken } from '../../../services/auth';
import { fetchTeams } from '../../../api/teams';
export interface TeamState {
  teams: Team[];
  loading: boolean;
  error: string | null;
}

const initialState: TeamState = {
  teams: [],
  loading: false,
  error: null,
};

export const fetchTeamsThunk = createAsyncThunk(
  'teams/fetchTeams',
  async (): Promise<Team[]> => {
    try {
      const token = await getToken();
      const response = await fetchTeams(token);
      return response.teams as Team[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    resetTeams: () => initialState,
    setTeams: (state, action: PayloadAction<Team[]>) => {
      state.teams = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTeamsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTeamsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.teams = (action.payload as Team[]) || [];
    });
    builder.addCase(fetchTeamsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch teams';
    });
  },
});

export const selectTeams = (state: RootState) => state.teams.teams;
export const { setTeams, resetTeams } = teamSlice.actions;
export default teamSlice.reducer;
