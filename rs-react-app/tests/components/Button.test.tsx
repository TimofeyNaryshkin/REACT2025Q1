import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Button from '../../src/components/UI/Button';
import React from 'react';

describe('Button', () => {
  it('should render button with text if has children', () => {
    render(<Button>button</Button>);
    screen.debug();
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/button/);
  });
});
