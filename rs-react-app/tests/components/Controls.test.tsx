import { it, describe, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { useState } from 'react';
import { Provider } from 'react-redux';
import Controls from '../../src/components/Controls/Controls';
import { setupStore } from '../../src/store/store';
import { useAppDispatch } from '../../src/hooks/redux';

vi.mock('../../src/hooks/redux', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock(import('../../src/hooks/useLastSearch'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useLastSearch: () => useState(''),
  };
});

const mockOnClick = vi.fn();

describe('Controls', () => {
  const setup = () => {
    const store = setupStore();
    return render(
      <Provider store={store}>
        <Controls />
      </Provider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders correctly', () => {
    setup();

    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Throw error')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  it('should throw error on error button click', () => {
    setup();

    const errorButton = screen.getByText('Throw error');
    expect(() => fireEvent.click(errorButton)).toThrowError('Error');
  });
  it('should update search on input', () => {
    setup();

    screen.debug();
    const search = screen.getByRole('textbox');
    fireEvent.change(search, { target: { value: 'star' } });
    expect(search).toHaveValue('star');
  });
  it('dispatches setSearchQuery and saves to localStorage on search', () => {
    const mockDispatch = vi.fn();
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);

    setup();
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Millennium Falcon' } });

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(mockDispatch).toHaveBeenCalled();
    expect(localStorage.getItem('lastSearch')).toBe('Millennium Falcon');
  });
});
