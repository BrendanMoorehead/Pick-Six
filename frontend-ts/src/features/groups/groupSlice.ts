import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Group } from '@/types';
import { fetchGroups } from '../../../api/groups';
import { getToken } from '../../../services/auth';
import { RootState } from '@/app/store';

export interface GroupState {
  groups: Group[];
  loading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  loading: false,
  error: null,
};

export const fetchGroupsThunk = createAsyncThunk(
  'groups/fetchGroups',
  async (): Promise<Group[]> => {
    try {
      const token = await getToken();
      const response = await fetchGroups(token);
      return response.groups as Group[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroupsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchGroupsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.groups = (action.payload as Group[]) || [];
    });
    builder.addCase(fetchGroupsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch groups';
    });
  },
});

export const selectGroups = (state: RootState) => state.groups.groups;
export const { setGroups } = groupSlice.actions;

export default groupSlice.reducer;
