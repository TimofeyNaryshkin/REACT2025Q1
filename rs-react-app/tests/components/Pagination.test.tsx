import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import Pagination from '../../src/components/UI/Pagination/Pagination';
import React from 'react';

vi.mock('./Button', () => ({
  default: ({ children, onButtonClick }: { children: React.ReactNode; onButtonClick: () => void }) => (
    <button onClick={onButtonClick}>{children}</button>
  ),
}));

describe('Pagination', () => {
  test('calls onButtonClick with the correct page number', () => {
    const mockOnClick = vi.fn();
    const pagesArr = [1, 2, 3];
    
    render(
      <Pagination
        pagesArr={pagesArr}
        page={1}
        onButtonClick={mockOnClick}
      />
    );

    fireEvent.click(screen.getByText('2'));
    
    expect(mockOnClick).toHaveBeenCalledWith(2);
  });
});