import { it, describe, expect, vi, afterEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import React from 'react';
import { Provider } from 'react-redux';
import ResultList from '../../src/components/ResultList/ResultList';
import { setupStore } from '../../src/store/store';
import { toggle, setShip } from '../../src/store/reducers/DetailsSlice';
import { Result } from '../../src/types/response';

const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  query: {},
  pathname: '/page/1',
};

const mockSearchParams = {
  get: vi.fn(),
};

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => mockSearchParams,
  usePathname: () => '/page/1',
}));

const mockResults = [
  { name: 'X-Wing', url: '/ship/1' },
  { name: 'TIE Fighter', url: '/ship/2' },
];

describe('ResultList', () => {
  const store = setupStore();
  vi.spyOn(store, 'dispatch');

  const renderWithProviders = (ships: Result[] | typeof mockResults | []) => {
    return render(
      <Provider store={store}>
        <ResultList ships={ships} />
      </Provider>
    );
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('displays Nothing found D: message if no results provided', () => {
    renderWithProviders([]);

    expect(screen.getByText('Nothing found D:')).toBeInTheDocument();
  });
  it('displays list of items if filteredResults is not empty', () => {
    renderWithProviders(mockResults);

    expect(screen.getByText('X-Wing')).toBeInTheDocument();
    expect(screen.getByText('TIE Fighter')).toBeInTheDocument();
  });
  it('opens details and updates URL', async () => {
    renderWithProviders(mockResults);

    fireEvent.click(screen.getByText('X-Wing'));

    const closeButton = await screen.findByRole('button', { name: /close/i });

    expect(closeButton).toBeInTheDocument();
    expect(mockRouter.push).toHaveBeenCalledWith(
      `${mockRouter.pathname}?details=X-Wing`,
      { scroll: false }
    );
    expect(store.dispatch).toBeCalledWith(toggle(true));
    expect(store.dispatch).toBeCalledWith(
      setShip({ name: 'X-Wing', url: '/ship/1' })
    );
  });
  it('calls closeDetails correctly and updates URL on close button click', async () => {
    renderWithProviders(mockResults);

    fireEvent.click(screen.getByText('X-Wing'));

    const closeButton = await screen.findByRole('button', { name: /close/i });

    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);

    expect(mockRouter.push).toHaveBeenCalledWith(`${mockRouter.pathname}`, {
      scroll: false,
    });
    expect(store.dispatch).toBeCalledWith(toggle(false));
  });
  it('calls closeDetails correctly and updates URL on same item click', async () => {
    renderWithProviders(mockResults);

    fireEvent.click(screen.getByText('X-Wing'));
    fireEvent.click(screen.getByText('X-Wing'));

    expect(mockRouter.push).toHaveBeenCalledWith(
      `${mockRouter.pathname}?details=X-Wing`,
      { scroll: false }
    );
    expect(store.dispatch).toBeCalledWith(toggle(true));
    waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(`${mockRouter.pathname}`, {
        scroll: false,
      });
      expect(store.dispatch).toBeCalledWith(toggle(false));
    });
  });
});
