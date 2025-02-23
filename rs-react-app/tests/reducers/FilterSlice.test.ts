import { describe, expect, it } from 'vitest';
import { filterSlice } from '../../src/store/reducers/FilterSlice';

describe('filterSlice', () => {
  it('should work with empty state', () => {
    expect(
      filterSlice.reducer(undefined, filterSlice.actions.setSearchQuery('123'))
    ).toEqual({ searchQuery: '123' });
  });
  it('setSearchQuery', () => {
    expect(
      filterSlice.reducer(
        { searchQuery: '' },
        filterSlice.actions.setSearchQuery('123')
      )
    ).toEqual({ searchQuery: '123' });
  });
});
