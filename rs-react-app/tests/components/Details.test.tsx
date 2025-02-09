import { it, describe } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Details from '../../src/pages/Details';
import React from 'react';

describe('Details', () => {
  it('should correctly display the detailed card data', () => {
    render(<Details />);
  });
});
