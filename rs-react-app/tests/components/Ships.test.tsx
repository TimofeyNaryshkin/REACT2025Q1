import { it, expect, describe, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Ships from '../../src/pages/Ships';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { setupStore } from '../../src/store/store';
import { Provider } from 'react-redux';

const store = setupStore();

describe('Ships', () => {
  it('should render the ships component', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Ships />
        </MemoryRouter>
      </Provider>
    );

    const searchBtn = screen.getByText(/search/i);
    const errBtn = screen.getByText(/throw error/i);
    const searchInput = screen.getByPlaceholderText(/starship name/i);
    const themeButton = screen.getByText(/toggle theme/i);

    screen.debug();

    await waitFor(() => {
      expect(searchBtn).toBeInTheDocument();
      expect(errBtn).toBeInTheDocument();
      expect(searchInput).toBeInTheDocument();
      expect(themeButton).toBeInTheDocument();
      expect(screen.getByText(/unselect all/i)).toBeInTheDocument();
      expect(screen.getByText(/download/i)).toBeInTheDocument();
      expect(screen.getByText(/0 starship is selected/i)).toBeInTheDocument();
    });
  });
});
