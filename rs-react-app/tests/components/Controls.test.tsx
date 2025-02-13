import { it, expect, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import React from 'react';
import Controls from '../../src/components/Controls/Controls';

vi.mock('../../src/components/UI/Search', () => ({
  __esModule: true,
  default: (props: any) => <input {...props} placeholder="Search input" />,
}));

vi.mock('../../src/components/UI/Button', () => ({
  __esModule: true,
  default: ({
    onButtonClick,
    children,
  }: {
    onButtonClick: any;
    children: string;
  }) => <button onClick={onButtonClick}>{children}</button>,
}));

describe('Controls Component', () => {
  it('renders the Controls component', () => {
    render(<Controls onButtonClick={vi.fn()} />);

    expect(screen.getByPlaceholderText('Search input')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Throw error')).toBeInTheDocument();
  });

  it('calls onButtonClick when Search button is clicked', () => {
    const mockOnClick = vi.fn();
    render(<Controls onButtonClick={mockOnClick} />);

    fireEvent.click(screen.getByText('Search'));

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('updates input value when typing', () => {
    render(<Controls onButtonClick={vi.fn()} />);

    const input = screen.getByPlaceholderText('Search input');
    fireEvent.change(input, { target: { value: 'X-Wing' } });

    expect(input).toHaveValue('X-Wing');
  });

  it("throws an error when 'Throw error' button is clicked", () => {
    render(<Controls onButtonClick={vi.fn()} />);

    expect(() => {
      fireEvent.click(screen.getByText('Throw error'));
    }).toThrow('Error');
  });
});
