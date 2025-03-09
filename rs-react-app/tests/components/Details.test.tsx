import { it, describe, expect, vi, beforeEach, Mock, afterEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Details from '../../src/components/Details/Details';
import { Provider } from 'react-redux';
import { setShip } from '../../src/store/reducers/DetailsSlice';
import React from 'react';
import { Result } from '../../src/types/response';
import { setupStore } from '../../src/store/store';

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
  const store = setupStore()

  const renderWithProviders = (ship: Result | {}) => {
    store.dispatch(setShip(ship))

    render(
      <Provider store={store}>
          <Details onButtonClick={mockOnClick} />
      </Provider>
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders ship details correctly when data is available', () => {
    renderWithProviders(mockResult);
    screen.debug();

    expect(screen.getByText('cost: 3500000')).toBeInTheDocument();
    expect(screen.getByText('crew: 30-165')).toBeInTheDocument();
    expect(screen.getByText('length: 150')).toBeInTheDocument();
    expect(
      screen.getByText('manufacturer: Corellian Engineering Corporation')
    ).toBeInTheDocument();
    expect(screen.getByText('class: corvette')).toBeInTheDocument();
  });
  it('should not render when no data is provided', () => {
    renderWithProviders({});
    screen.debug();
    expect(screen.getByText('cost: undefined')).toBeInTheDocument();
  });
  it('should call onButtonClick when the close button is clicked', () => {
    renderWithProviders(mockResult);
    const closeButton = screen.queryByText('Close');
    fireEvent.click(closeButton);
    expect(mockOnClick).toBeCalled();
  });
});
