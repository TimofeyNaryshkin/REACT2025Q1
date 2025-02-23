import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, vi, beforeEach, it, Mock } from 'vitest';
import Pagination from '../../src/components/UI/Pagination/Pagination';
import React from 'react';
import { starshipAPI } from '../../src/services/starship';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { detailsSlice } from '../../src/store/reducers/DetailsSlice';
import { MemoryRouter, Route, Routes } from 'react-router';

vi.mock('../../src/services/starship', () => ({
  starshipAPI: {
    useFetchShipsPageQuery: vi.fn(),
  },
}));

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Pagination', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const mockStore = configureStore({
    reducer: {
      details: detailsSlice.reducer,
      [starshipAPI.reducerPath]: starshipAPI.reducer,
    },
  });

  const renderWithProviders = (initialEntries = ['/?page=1']) =>
    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={initialEntries}>
          <Routes>
            <Route path="/" element={<Pagination />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

  it('renders correct number of pagination buttons', () => {
    (starshipAPI.useFetchShipsPageQuery as Mock).mockReturnValue({
      data: { count: 50, results: [] },
    });

    renderWithProviders();

    expect(screen.getAllByRole('button')).toHaveLength(5);
  });
  /* it('should update the URL and dispatche action on button click', () => {
    (starshipAPI.useFetchShipsPageQuery as Mock).mockReturnValue({
      data: { count: 50, results: [] },
    });

    renderWithProviders();

    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);

    expect(mockNavigate).toBeCalledWith('?page=2', { replace: true });
  }); */
});
