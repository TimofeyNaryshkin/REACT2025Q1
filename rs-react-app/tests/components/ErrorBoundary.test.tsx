import { render, screen } from '@testing-library/react';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import ErrorBoundary from '../../src/components/ErrorBoundary';
import '@testing-library/jest-dom/vitest';
import React from 'react';

const ErrorComponent = () => {
  throw new Error('Test error');
};

const originalError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe('ErrorBoundary', () => {
  it('should show error message when children throw error', () => {
    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(/Oops Error Please try this page/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reload/i })).toBeInTheDocument();
  });
});
