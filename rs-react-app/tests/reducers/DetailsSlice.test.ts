import { describe, expect, it } from 'vitest';
import { storedItemsSlice } from '../../src/store/reducers/StoredItemsSlice';
import { detailsSlice } from '../../src/store/reducers/DetailsSlice';

describe('detailsSlice', () => {
  it('should work with empty state', () => {
    expect(
      detailsSlice.reducer(
        undefined,
        detailsSlice.actions.toggle(true)
      )
    ).toEqual({ isOpened: true });
  });
  it('toggle', () => {
    expect(
      detailsSlice.reducer(
        { isOpened: false },
        detailsSlice.actions.toggle(true)
      )
    ).toEqual({ isOpened: true });
  });
});
