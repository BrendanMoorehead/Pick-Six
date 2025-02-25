import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { getToken } from '../../../services/auth';
import { Timeframe } from '@/types';

export interface TimeframeState {
  timeframes: Timeframe[];
  loading: boolean;
  error: string | null;
}

const initialState: TimeframeState = {
  timeframes: [],
  loading: false,
  error: null,
};

export const fetchTimeframesThunk = createAsyncThunk(
  'teams/fetchTimeframes',
  async (): Promise<Timeframe[]> => {
    try {
      const token = await getToken();
      const response = await fetchTimeframes(token);
      return response.timeframes as Timeframe[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const timeframesSlice = createSlice({
  name: 'timeframes',
  initialState,
  reducers: {
    resetTimeframes: () => initialState,
    setTimeframes: (state, action: PayloadAction<Timeframe[]>) => {
      state.timeframes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTimeframesThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTimeframesThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.timeframes = (action.payload as Timeframe[]) || [];
    });
    builder.addCase(fetchTimeframesThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch teams';
    });
  },
});

export const selectTimeframes = (state: RootState) =>
  state.timeframes.timeframes;
export const { setTimeframes, resetTimeframes } = timeframesSlice.actions;
export default timeframesSlice.reducer;
