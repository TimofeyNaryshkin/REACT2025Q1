import { describe, expect, it } from 'vitest';
import { storedItemsSlice } from '../../src/store/reducers/StoredItemsSlice';
import { detailsSlice } from '../../src/store/reducers/DetailsSlice';

const mockShip = {
  name: 'fighter',
  class: 'fighter',
};

describe('detailsSlice', () => {
  it('should work with empty state', () => {
    expect(
      detailsSlice.reducer(undefined, detailsSlice.actions.toggle(true))
    ).toEqual({ isOpened: true, ship: {} });
  });
  it('toggle', () => {
    expect(
      detailsSlice.reducer(
        { isOpened: false, ship: mockShip },
        detailsSlice.actions.toggle(true)
      )
    ).toEqual({ isOpened: true, ship: mockShip });
  });
});
