import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Search from '../../src/components/UI/Search';
import React from 'react';

describe('Search', () => {
  it('should render input with text if has inputValue', () => {
    render(<Search inputValue="some value" />);

    const search = screen.getByRole('textbox');
    expect(search).toBeInTheDocument();
  });
});
