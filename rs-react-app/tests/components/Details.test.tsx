import { it, describe, expect, vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Details from '../../src/pages/Details';
import React from 'react';
import { MemoryRouter } from 'react-router';

const mockResult = {
  cost_in_credits: '100,000',
  crew: '4',
  length: '34.37m',
  manufacturer: 'Sienar Fleet Systems',
  starship_class: 'Starfighter',
};

describe('Details', () => {
  it('should correctly display the detailed card data', () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: '/details', state: mockResult }]}
      >
        <Details to={'/'} />
      </MemoryRouter>
    );
    screen.debug();

    expect(screen.getByText(/cost: 100,000/i)).toBeInTheDocument();
    expect(screen.getByText(/crew: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/length: 34.37m/i)).toBeInTheDocument();
    expect(
      screen.getByText(/manufacturer: Sienar Fleet Systems/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Starfighter/i)).toBeInTheDocument();
  });
 

  it('should display error if location.state is missing', () => {
    render(
      <MemoryRouter
        initialEntries={[{ pathname: '/details' }]}
      >
        <Details to={'/'} />
      </MemoryRouter>
    );
    screen.debug();

    expect(screen.getByText(/no data available/i)).toBeInTheDocument();
  });
});
