import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  searchQuery: string;
}

const initialState: FilterState = {
  searchQuery: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
  },
});

export default filterSlice.reducer;
