import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Pick } from '@/types';
import { getToken, getUserId } from '../../../services/auth';
import { RootState } from '@/app/store';
import {
  CreatePicksRequest,
  CreatePicksResponse,
  fetchPicks,
  makePicks,
} from '../../../api/picks';

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

export const makePicksThunk = createAsyncThunk<
  CreatePicksResponse, // The success return type
  CreatePicksRequest, // The input type (data)
  { rejectValue: CreatePicksResponse } // The error return type
>('picks/makePicks', async (data, { rejectWithValue }) => {
  try {
    const token = await getToken();
    const user_id = await getUserId();
    const data_with_user = {
      picks: data.picks.map((pick) => {
        return {
          ...pick,
          made_by: user_id,
        };
      }),
    };
    const response = await makePicks(data_with_user, token);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return rejectWithValue({
      success: false,
      message:
        error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
});

export const pickSlice = createSlice({
  name: 'picks',
  initialState,
  reducers: {
    resetPicks: () => initialState,
    setPicks: (state, action: PayloadAction<Pick[]>) => {
      state.picks = action.payload;
    },
    addPick: (state, action: PayloadAction<Pick>) => {
      let matchedPickIndex = state.picks.findIndex(
        (pick) =>
          pick.game_id === action.payload.game_id &&
          pick.group_id === action.payload.group_id
      );
      if (matchedPickIndex !== -1) {
        state.picks[matchedPickIndex] = action.payload;
      } else state.picks.push(action.payload);
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

    builder.addCase(makePicksThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(makePicksThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(makePicksThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to make picks';
    });
  },
});

export const selectPicks = (state: RootState) => state.picks.picks;
export const { setPicks, resetPicks, addPick } = pickSlice.actions;

export default pickSlice.reducer;
