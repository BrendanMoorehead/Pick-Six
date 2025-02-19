import { combineReducers, configureStore } from '@reduxjs/toolkit';
import groupSlice from '@/features/groups/groupSlice';
import teamSlice from '@/features/teams/teamsSlice';
import gameSlice from '@/features/games/gameSlice';
import pickSlice from '@/features/picks/pickSlice';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage, // Uses localStorage
  whitelist: ['games', 'teams', 'groups', 'picks'], // Specify which reducers to persist
};

const rootReducer = combineReducers({
  groups: groupSlice,
  teams: teamSlice,
  games: gameSlice,
  picks: pickSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required for redux-persist
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
