import { it, describe, expect, vi, beforeEach, Mock } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Details from '../../src/pages/Details';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { starshipAPI } from '../../src/services/starship';
import { configureStore } from '@reduxjs/toolkit';
import detailsReducer from '../../src/store/reducers/DetailsSlice';
import { useAppSelector } from '../../src/hooks/redux';

vi.mock('../../src/services/starship', () => ({
  starshipAPI: {
    useFetchShipDetailsQuery: vi.fn(),
  },
}));

vi.mock('../../src/hooks/redux', () => ({
  useAppSelector: vi.fn(),
}));

const mockOnClick = vi.fn();

const mockResult = {
  name: 'CR90 corvette',
  model: 'CR90 corvette',
  manufacturer: 'Corellian Engineering Corporation',
  cost_in_credits: '3500000',
  length: '150',
  max_atmosphering_speed: '950',
  crew: '30-165',
  passengers: '600',
  cargo_capacity: '3000000',
  consumables: '1 year',
  hyperdrive_rating: '2.0',
  MGLT: '60',
  starship_class: 'corvette',
  pilots: [],
  films: [
    'https://swapi.dev/api/films/1/',
    'https://swapi.dev/api/films/3/',
    'https://swapi.dev/api/films/6/',
  ],
  created: '2014-12-10T14:20:33.369000Z',
  edited: '2014-12-20T21:23:49.867000Z',
  url: 'https://swapi.dev/api/starships/2/',
};

describe('Details', () => {
  const mockStore = configureStore({
    reducer: {
      detailsReducer,
      [starshipAPI.reducerPath]: starshipAPI.reducer,
    },
  });

  const renderWithProviders = (shipPath: string, isOpened: boolean = true) => {
    (useAppSelector as Mock).mockReturnValue({ isOpened: isOpened });

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Details shipPath={shipPath} onButtonClick={mockOnClick} />
        </MemoryRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state when fetching', () => {
    (starshipAPI.useFetchShipDetailsQuery as Mock).mockReturnValue({
      isFetching: true,
    });

    renderWithProviders('1/');

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
  it('renders error message when API call fails', () => {
    (starshipAPI.useFetchShipDetailsQuery as Mock).mockReturnValue({
      error: true,
    });

    renderWithProviders('1/');

    expect(screen.getByText('Cant find details')).toBeInTheDocument();
  });
  it('renders ship details correctly when data is available', () => {
    (starshipAPI.useFetchShipDetailsQuery as Mock).mockReturnValue({
      data: mockResult,
    });

    renderWithProviders('1/');
    screen.debug();

    expect(screen.getByText('cost: 3500000')).toBeInTheDocument();
    expect(screen.getByText('crew: 30-165')).toBeInTheDocument();
    expect(screen.getByText('length: 150')).toBeInTheDocument();
    expect(
      screen.getByText('manufacturer: Corellian Engineering Corporation')
    ).toBeInTheDocument();
    expect(screen.getByText('class: corvette')).toBeInTheDocument();
  });
  it('should not render when isOpened is false', () => {
    renderWithProviders('1/', false);
    expect(screen.queryByText('Close')).not.toBeInTheDocument();
  });
  it('should call onButtonClick when the close button is clicked', () => {
    renderWithProviders('1/', true);
    const closeButton = screen.queryByText('Close');
    fireEvent.click(closeButton);
    expect(mockOnClick).toBeCalled();
  });
});
