import { configureStore } from '@reduxjs/toolkit';
import groupSlice from '@/features/groups/groupSlice';
import teamSlice from '@/features/teams/teamsSlice';
import gameSlice from '@/features/games/gameSlice';

export const store = configureStore({
  reducer: {
    groups: groupSlice,
    teams: teamSlice,
    games: gameSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
