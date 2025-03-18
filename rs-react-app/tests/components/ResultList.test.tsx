import { it, describe, expect, vi, afterEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import ResultList from '../../src/components/ResultList/ResultList';
import { setupStore } from '../../src/store/store';
import { toggle } from '../../src/store/reducers/DetailsSlice';
import { Result } from '../../src/types/response';
import { Params, BrowserRouter } from 'react-router';

const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  query: {},
  pathname: '/page/1',
};

vi.mock('next/router', () => ({
  useRouter: () => mockRouter,
}));

const mockResults = [
  { name: "Rebel transport",
    model: "GR-75 medium transport",
    manufacturer: "Gallofree Yards, Inc.",
    cost_in_credits: "unknown",
    length: "90",
    max_atmosphering_speed: "650",
    crew: "6",
    passengers: "90",
    cargo_capacity: "19000000",
    consumables: "6 months",
    hyperdrive_rating: "4.0",
    MGLT: "20",
    starship_class: "Medium transport",
    pilots: [],
    films: [],
    created: "2014-12-15T12:34:52.264000Z",
    edited: "2014-12-20T21:23:49.895000Z",
    url: "https://swapi.dev/api/starships/17/"
  },
  { name: "Executor",
    model: "Executor-class star dreadnought",
    manufacturer: "Kuat Drive Yards, Fondor Shipyards",
    cost_in_credits: "1143350000",
    length: "19000",
    max_atmosphering_speed: "n/a",
    crew: "279,144",
    passengers: "38000",
    cargo_capacity: "250000000",
    consumables: "6 years",
    hyperdrive_rating: "2.0",
    MGLT: "40",
    starship_class: "Star dreadnought",
    pilots: [],
    films: [],
    created: "2014-12-15T12:31:42.547000Z",
    edited: "2014-12-20T21:23:49.893000Z",
    url: "https://swapi.dev/api/starships/15/" 
  },
];

describe('ResultList', () => {
  const store = setupStore();
  vi.spyOn(store, 'dispatch');

  const renderWithProviders = (ships: Result[] | undefined, params: Params, children: ReactElement | null) => {
    return render(
      <BrowserRouter>
        <Provider store={store}>
          <ResultList ships={ships} params={params} children={children}/>
        </Provider>
      </BrowserRouter>
      
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('displays Nothing found D: message if no results provided', () => {
    renderWithProviders(undefined, {page: '1'}, null);

    expect(screen.getByText('Nothing found D:')).toBeInTheDocument();
  });
  it('displays list of items if filteredResults is not empty', () => {
    renderWithProviders(mockResults, {page: '1'}, null);

    expect(screen.getByText('Rebel transport')).toBeInTheDocument();
    expect(screen.getByText('Executor')).toBeInTheDocument();
  });
  it('opens details and updates URL', async () => {
    renderWithProviders(mockResults, {page: '1'}, null);

    fireEvent.click(screen.getByText('Rebel transport'));

    expect(window.location.pathname).toBe('/page/1/details/17')
    expect(store.dispatch).toBeCalledWith(toggle(true));
  });
  it('calls closeDetails correctly and updates URL on same item click', async () => {
    renderWithProviders(mockResults, {page: '1', id: '17'}, null);
    
    await waitFor(() => {
      fireEvent.click(screen.getByText('Rebel transport'));
      expect(window.location.pathname).toBe('/page/1')
      expect(store.dispatch).toBeCalledWith(toggle(false));
    })
    
  });
});
