import { it, expect, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Search from '../../src/components/UI/Search';
import React from 'react';

describe('Search', () => {
  it('should render input with text if has inputValue', () => {
    const fn = vi.fn();
    render(<Search value="query" onChange={fn} />);

    const search = screen.getByDisplayValue(/query/i);
    expect(search).toBeInTheDocument();
    fireEvent.change(search, {
      target: {
        value: 'star',
      },
    });
    expect(fn).toBeCalled();
  });
});
