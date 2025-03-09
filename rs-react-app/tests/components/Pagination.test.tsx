import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, vi, it, afterEach } from 'vitest';
import Pagination from '../../src/components/UI/Pagination/Pagination';
import React from 'react';
import { Provider, useDispatch } from 'react-redux';
import { setupStore } from '../../src/store/store';
import { toggle } from '../../src/store/reducers/DetailsSlice'

const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  query: {},
  pathname: '/',
}

vi.mock('next/router', () => ({
  useRouter: () => mockRouter
}))

describe('Pagination', () => {
  const store = setupStore()
  vi.spyOn(store,'dispatch')

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderWithProviders = (totalItems: number) =>
    render(
      <Provider store={store}>
        <Pagination totalItems={totalItems}/>
      </Provider>
    );

  it('renders correct number of pagination buttons', () => {
    renderWithProviders(36);

    screen.debug()
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });
  it('should update the URL and close details on link click', () => {

    renderWithProviders(36);

    screen.debug()
    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);

    waitFor(() => expect(mockRouter.pathname).toBe('/page/2'))
    expect(store.dispatch).toBeCalledWith(toggle(false))
  });
});
