import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResultData } from '../../types/types';

interface StoredItemsSlice {
  items: ResultData[];
}

const initialState: StoredItemsSlice = {
  items: [],
};

export const storedItemsSlice = createSlice({
  name: 'storedItems',
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<ResultData>) {
      const index = state.items.findIndex(
        (item) => item.url === action.payload.url
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export default storedItemsSlice.reducer;
