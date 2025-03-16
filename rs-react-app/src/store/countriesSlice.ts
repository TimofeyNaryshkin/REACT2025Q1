import { createSlice } from '@reduxjs/toolkit';

const initialState: string[] = [
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
];

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function

export default countriesSlice.reducer;
