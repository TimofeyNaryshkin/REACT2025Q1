import { it, expect, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import ResultItem from '../../src/components/ResultItem/ResultItem';
import { Provider } from 'react-redux';
import { setupStore } from '../../src/store/store';

describe('ResultItem', () => {
  const mockOnClick = vi.fn();
  const mockResult = {
    name: 'CR90 corvette',
    model: 'CR90 corvette',
    manufacturer: 'Corellian Engineering Corporation',
    cost_in_credits: '3500000',
    length: '150',
    max_atmosphering_speed: '950',
    crew: '30-165',
    passengers: '600',
    cargo_capacity: '3000000',
    consumables: '1 year',
    hyperdrive_rating: '2.0',
    MGLT: '60',
    starship_class: 'corvette',
    pilots: [],
    films: [
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/3/',
      'https://swapi.dev/api/films/6/',
    ],
    created: '2014-12-10T14:20:33.369000Z',
    edited: '2014-12-20T21:23:49.867000Z',
    url: 'https://swapi.dev/api/starships/2/',
  };

  const store = setupStore();
  it('should render div with name and model if provided', () => {
    render(
      <Provider store={store}>
        <ResultItem result={mockResult} onClick={mockOnClick} />
      </Provider>
    );
    screen.debug();

    expect(screen.getByRole('strong')).toBeInTheDocument();
    expect(screen.getByText(/model: CR90 corvette/i)).toBeInTheDocument();
  });

  it('should invoke click handle functin on resut item click', () => {
    render(
      <Provider store={store}>
        <ResultItem result={mockResult} onClick={mockOnClick} />
      </Provider>
    );

    screen.debug();
    const item = screen.getByRole('strong');
    fireEvent.click(item);
    expect(mockOnClick).toBeCalled();
  });
  it('should render div with checkbox', () => {
    render(
      <Provider store={store}>
        <ResultItem result={mockResult} onClick={mockOnClick} />
      </Provider>
    );
    screen.debug();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    fireEvent.change(checkbox);
    expect(checkbox).toBeChecked;
  });
});
