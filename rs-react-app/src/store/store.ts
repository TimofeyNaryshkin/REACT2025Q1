import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { starshipAPI } from '../services/starship';
import detailsReducer from './reducers/DetailsSlice'


const rootReducer = combineReducers({
  detailsReducer,
  [starshipAPI.reducerPath]: starshipAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware().concat(starshipAPI.middleware)
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
