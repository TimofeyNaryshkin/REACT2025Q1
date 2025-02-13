import { it, expect, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ResultItem from '../../src/components/ResultItem/ResultItem';
import React from 'react';
import { MemoryRouter } from 'react-router';

describe('ResultItem', () => {
  const mockOnClick = vi.fn();

  it('should render div with name and model if provided', () => {
    render(<ResultItem name="Star" model="Destroyer" />);
    screen.debug();

    expect(screen.getByText(/star/i)).toBeInTheDocument();
    expect(screen.getByText(/destroyer/i)).toBeInTheDocument();
  });

  it('should invoke click handle functin on resut item click', () => {
    render(
      <ResultItem name="Star" model="Destroyer" onClick={mockOnClick}/>
    );

    screen.debug()
    const item = screen.getByText(/Star/i)
    fireEvent.click(item)
    expect(mockOnClick).toBeCalled()
  });
});
