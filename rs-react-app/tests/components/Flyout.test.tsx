import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Flyout from '../../src/components/UI/Flyout/Flyout';
import { RootState, setupStore } from '../../src/store/store';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../src/hooks/redux';
import { downloadCsv } from '../../src/utils/downloadCsv';

const mockResult = {
  items: [
    {
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
    },
  ],
};

vi.mock('../../src/hooks/redux', () => ({
  useAppSelector: vi.fn((selector: (state: RootState) => unknown) =>
    selector({
      detailsReducer: {},
      storedItemsReducer: mockResult,
      filterReducer: {},
      starshipAPI: {},
    } as RootState)
  ),
  useAppDispatch: vi.fn(() => vi.fn()),
}));

vi.mock('../../src/utils/downloadCsv', () => ({
  downloadCsv: vi.fn(),
}));

globalThis.URL.createObjectURL = vi.fn(() => 'mocked-url');
const store = setupStore();

describe('Flyout component', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppSelector).mockImplementation((selector) =>
      selector({
        storedItemsReducer: mockResult,
      } as RootState)
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render correctly with selected characters', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText(/ship is selected/i)).toBeInTheDocument();
    expect(screen.getByText(/Unselect all/i)).toBeInTheDocument();
    expect(screen.getByText(/Download/i)).toBeInTheDocument();
  });

  it('should dispatch clear action when unselect all clicked', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Unselect all'));
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should call CSV download functions when download clicked', () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Download'));

    expect(downloadCsv).toHaveBeenCalledWith(mockResult.items);
  });
});
