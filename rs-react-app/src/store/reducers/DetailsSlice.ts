import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DetailsState {
  isOpened: boolean;
}

const initialState: DetailsState = {
  isOpened: false,
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    toggle(state, action: PayloadAction<boolean>) {
      state.isOpened = action.payload;
    },
  },
});

export const { toggle } = detailsSlice.actions;
export default detailsSlice.reducer;
