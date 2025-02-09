import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ResultItem from '../../src/components/ResultItem/ResultItem';
import React from 'react';

describe('ResultItem', () => {
  it('should render div with name and model if provided', () => {
    render(<ResultItem name="Star" model="Destroyer" />);

    const item = screen.getByText('Star');
    expect(item).toBeInTheDocument();
  });
});
