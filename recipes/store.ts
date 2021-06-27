import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import { recipeReducer } from './slices';

import { loadState, saveState } from './local-storage';
import throttle from 'lodash/throttle';

const rootReducer = combineReducers({
  recipes: recipeReducer,
});

const persistedState = loadState();

const customizedMiddleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
});

const getEvents = () => (next) => (action) => {
  return next(action);
}

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  middleware: customizedMiddleware.concat(getEvents)
});

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 3000)
);

export default store;