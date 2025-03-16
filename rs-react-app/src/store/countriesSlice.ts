import { createSlice } from '@reduxjs/toolkit';

export interface countriesState {
  countries: string[];
}

const initialState: countriesState = {
  countries: [
    'United States',
    'Canada',
    'Germany',
    'France',
    'Australia',
    'Japan',
    'Brazil',
    'United Kingdom',
    'India',
    'South Africa',
    'Russia',
  ],
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = countriesSlice.actions;

export default countriesSlice.reducer;
