import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Result } from 'types/response';

interface DetailsState {
  isOpened: boolean;
  ship: Partial<Result>;
}

const initialState: DetailsState = {
  isOpened: false,
  ship: {},
};

export const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    toggle(state, action: PayloadAction<boolean>) {
      state.isOpened = action.payload;
    },
    setShip(state, action: PayloadAction<Result>) {
      state.ship = action.payload;
    },
  },
});

export const { toggle, setShip } = detailsSlice.actions;
export default detailsSlice.reducer;
