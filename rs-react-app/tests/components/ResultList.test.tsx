import { it, describe, expect, vi, beforeEach, Mock } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../../src/store/reducers/FilterSlice';
import { useAppDispatch, useAppSelector } from '../../src/hooks/redux';
import ResultList from '../../src/components/ResultList/ResultList';
import { setupStore } from '../../src/store/store';
import { starshipAPI } from '../../src/services/starship';

vi.mock('../../src/services/starship', () => ({
  starshipAPI: {
    useFetchShipsPageQuery: vi.fn(),
  },
}));

vi.mock('../../src/hooks/redux', () => ({
  useAppSelector: vi.fn(),
  useAppDispatch: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
    useLocation: vi.fn(() => ({ pathname: '/', search: '?page=1' })),
    useSearchParams: vi.fn(() => [{ get: vi.fn(() => '1') }]),
  };
});

const mockOnClick = vi.fn();

const mockResults = [
  { name: 'X-Wing', url: '/ship/1' },
  { name: 'TIE Fighter', url: '/ship/2' },
];

describe('ResultList', () => {
  const mockStore = configureStore({
    reducer: {
      filterReducer,
      [starshipAPI.reducerPath]: starshipAPI.reducer,
    },
  });

  const setup = () => {
    return render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ResultList />
        </MemoryRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state when fetching', () => {
    (starshipAPI.useFetchShipsPageQuery as Mock).mockReturnValue({
      filteredResults: [],
      isFetching: true,
      error: null,
    });

    setup();

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  it('displays error message if error occures', () => {
    (starshipAPI.useFetchShipsPageQuery as Mock).mockReturnValue({
      filteredResults: [],
      isFetching: false,
      error: true,
    });

    setup();

    expect(screen.getByText('Some error')).toBeInTheDocument();
  });
  it('displays Nothing found D: message if no results provided', () => {
    (starshipAPI.useFetchShipsPageQuery as Mock).mockReturnValue({
      filteredResults: [],
      isFetching: false,
      error: false,
    });

    setup();

    expect(screen.getByText('Nothing found D:')).toBeInTheDocument();
  });
  it('displays list of items if filteredResults is not empty', () => {
    (starshipAPI.useFetchShipsPageQuery as Mock).mockReturnValue({
      filteredResults: mockResults,
      isFetching: false,
      error: false,
    });

    setup();

    expect(screen.getByText('X-Wing')).toBeInTheDocument();
  });
});
