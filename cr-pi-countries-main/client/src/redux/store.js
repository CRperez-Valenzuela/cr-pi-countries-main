
import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './countriesSlice';
import activitiesReducer from './activitiesSlice';


export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    activities: activitiesReducer,
  },
});
