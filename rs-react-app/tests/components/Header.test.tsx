import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Header from '../../src/components/Header/Header';
import React from 'react';
import { Provider } from 'react-redux';
import { setupStore } from '../../src/store/store';
import {
  ThemeProvider,
  useTheme,
  useThemeUpdate,
} from '../../src/hooks/useTheme';

const mockOnClick = vi.fn();
const store = setupStore();
vi.mock('../../src/hooks/useTheme', () => ({}));

vi.mock('../../src/hooks/useTheme', async (importOriginal) => {
  const original = await importOriginal();

  return {
    useTheme: vi.fn().mockReturnValue(false),
    useThemeUpdate: vi.fn().mockImplementation(() => {
      (prevTheme) => !prevTheme;
    }),
    ThemeProvider: ({ children }) => <div>{children}</div>,
  };
});

describe('Header', () => {
  it('should call mockOnClick on theme button click', () => {
    vi.mocked(useThemeUpdate).mockReturnValue(mockOnClick);
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const themeButton = screen.getByText(/Toggle theme/i);
    fireEvent.click(themeButton);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  it('useTheme returns correct theme value', () => {
    render(
      <ThemeProvider>
        <Provider store={store}>
          <Header />
        </Provider>
      </ThemeProvider>
    );

    expect(useTheme()).toBe(false);
  });

  it('useThemeUpdate toggles theme value on button click', () => {
    render(
      <ThemeProvider>
        <Provider store={store}>
          <Header />
        </Provider>
      </ThemeProvider>
    );

    const button = screen.getByText('Toggle theme');

    fireEvent.click(button);

    expect(useThemeUpdate).toBeCalled();
  });
});
