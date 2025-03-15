import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FormState {
  data: any;
}

const initialState: FormState = {
  data: {},
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    storeData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeData } = formSlice.actions;

export default formSlice.reducer;
