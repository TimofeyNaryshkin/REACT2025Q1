import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Result } from '../../types/response';

interface StoredItemsSlice {
  items: Result[];
}

const initialState: StoredItemsSlice = {
  items: [],
};

export const storedItemsSlice = createSlice({
  name: 'storedItems',
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<Result>) {
      const index = state.items.findIndex(
        (item) => item.url === action.payload.url
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
    unselectAll(state, action: PayloadAction<[]>) {
      state.items = action.payload;
    },
  },
});

export default storedItemsSlice.reducer;
