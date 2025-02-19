import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Pick } from '@/types';
import { getToken } from '../../../services/auth';
import { RootState } from '@/app/store';

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

// export const fetchPicksThunk = createAsyncThunk(
//     'picks/fetchPicks'
// )
