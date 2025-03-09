import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Loader from '../../src/components/UI/Loader/Loader';
import React from 'react';

describe('Loader', () => {
  it('should display loader', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
