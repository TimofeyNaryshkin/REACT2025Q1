import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { StoredData } from 'src/types/form';

export interface FormState {
  data: StoredData[];
}

const initialState: FormState = {
  data: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    storeData: (state, action: PayloadAction<StoredData>) => {
      state.data.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeData } = formSlice.actions;

export default formSlice.reducer;
