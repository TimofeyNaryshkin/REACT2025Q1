import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Details from '../../src/pages/Details';
import React from 'react';

const mockData = {
  name: 'string1',
  model: 'string2',
  cost_in_credits: 'string3',
  crew: 'string4',
  length: 'string5',
  manufacturer: 'string6',
  starship_class: 'string7',
  url: 'string8',
};

describe('Details', () => {
  it('should correctly display the detailed card data', () => {
    render(<Details />);
  });
});
