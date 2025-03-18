import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, vi, it, afterEach } from 'vitest';
import Pagination from '../../src/components/UI/Pagination/Pagination';
import { Provider } from 'react-redux';
import { setupStore } from '../../src/store/store';
import { toggle } from '../../src/store/reducers/DetailsSlice';
import { BrowserRouter } from 'react-router';

describe('Pagination', () => {
  const store = setupStore();
  vi.spyOn(store, 'dispatch');

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderWithProviders = (totalItems: number, page: string) =>
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Pagination totalItems={totalItems} page={page} />
        </Provider>
      </BrowserRouter>
      
    );

  it('renders correct number of pagination buttons', () => {
    renderWithProviders(36, '1');

    screen.debug();
    expect(screen.getAllByRole('link')).toHaveLength(4);
  });
  it('should update the URL and close details on link click', async () => {
    renderWithProviders(36, '1');

    screen.debug();
    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);

    await waitFor(() => expect(window.location.pathname).toBe('/page/2'));
    expect(store.dispatch).toBeCalledWith(toggle(false));
  });
});
