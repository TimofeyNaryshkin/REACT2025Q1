import { it, expect, describe, vitest } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ResultList from '../../src/components/ResultList/ResultList';
import React from 'react';
import { MemoryRouter } from 'react-router';

vitest.mock('../ResultItem/ResultItem', () => ({
  default: ({ name }: { name: string }) => (
    <div className="result-item">{name}</div>
  ),
}));

const mockResults = [
  {
    name: 'Ship 1',
    url: 'url1',
    model: 'Model',
    cost_in_credits: '1000',
    crew: '2',
    length: '1000',
    manufacturer: '1234',
    starship_class: '123',
  },
  {
    name: 'Ship 2',
    url: 'url2',
    model: 'Model',
    cost_in_credits: '2000',
    crew: '2',
    length: '1000',
    manufacturer: '1234',
    starship_class: '123',
  },
];

const mockHeader = {
  name: '12345',
  description: '12345',
  errorMessage: 'error 12345',
};

describe('ResultList', () => {
  it('should render the specified number of cards', () => {
    render(
      <MemoryRouter>
        <ResultList results={mockResults} header={mockHeader} />
      </MemoryRouter>
    );
    const resultItems = screen.getAllByText('model: Model');
    expect(resultItems).toHaveLength(mockResults.length);
  });
});

describe('ResultList', () => {
  it('should display an appropriate message if no cards are present', () => {
    render(
      <MemoryRouter>
        <ResultList results={''} header={mockHeader} />
      </MemoryRouter>
    );
    const resultList = screen.getByText('error 12345')
    expect(resultList).toBeInTheDocument()
  });
})
