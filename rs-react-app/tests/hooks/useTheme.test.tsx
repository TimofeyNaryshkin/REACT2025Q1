import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { describe, expect, vi, beforeEach, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import {
  ThemeProvider,
  useTheme,
  useThemeUpdate,
} from '../../src/hooks/useTheme';
import React from 'react';

vi.spyOn(console, 'log');

beforeEach(() => {
  vi.clearAllMocks();
});

function TestComponent() {
  const isDark = useTheme();
  const toggleTheme = useThemeUpdate();
  return (
    <>
      <div>{isDark ? 'dark' : 'light'}</div>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </>
  );
}

describe('ThemeProvider', () => {
  it('provides initial theme as light', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByText('light')).toBeInTheDocument();
  });

  it('toggles theme to dark when button is clicked and logs previous state', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByText('Toggle Theme');
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(screen.getByText('dark')).toBeInTheDocument();
    });
    expect(console.log).toHaveBeenCalledWith(false);
  });

  it('toggles theme back to light after two clicks and logs both states', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const toggleButton = screen.getByText('Toggle Theme');

    fireEvent.click(toggleButton);
    await waitFor(() => expect(screen.getByText('dark')).toBeInTheDocument());

    fireEvent.click(toggleButton);
    await waitFor(() => expect(screen.getByText('light')).toBeInTheDocument());

    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenNthCalledWith(1, false);
    expect(console.log).toHaveBeenNthCalledWith(2, true);
  });
});
