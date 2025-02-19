import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Pick } from '@/types';
import { getToken } from '../../../services/auth';
import { RootState } from '@/app/store';
import { fetchPicks } from '../../../api/picks';

export interface PickState {
  picks: Pick[];
  loading: boolean;
  error: string | null;
}

const initialState: PickState = {
  picks: [],
  loading: false,
  error: null,
};

export const fetchPicksThunk = createAsyncThunk(
  'picks/fetchPicks',
  async (group_id: number): Promise<Pick[]> => {
    try {
      const token = await getToken();
      const response = await fetchPicks(token, group_id);
      return response.picks as Pick[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const pickSlice = createSlice({
  name: 'picks',
  initialState,
  reducers: {
    resetPicks: () => initialState,
    setPicks: (state, action: PayloadAction<Pick[]>) => {
      state.picks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPicksThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPicksThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.picks = (action.payload as Pick[]) || [];
    });
    builder.addCase(fetchPicksThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch picks';
    });
  },
});

export const selectPicks = (state: RootState) => state.picks.picks;
export const { setPicks, resetPicks } = pickSlice.actions;

export default pickSlice.reducer;
