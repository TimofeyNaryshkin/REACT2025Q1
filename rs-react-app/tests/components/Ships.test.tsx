import { it, expect, describe, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Ships from '../../src/pages/Ships';
import React from 'react';
import {
  MemoryRouter
} from 'react-router';

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

describe('Ships', () => {
  const mockSetResults = vi.fn();
  const mockSetHeader = vi.fn();
  const mockSetFilteredResults = vi.fn();
  const mockSetTotalPages = vi.fn();
  const useState = vi.fn();
  const useNavigate = vi.fn();
  const useLocation = vi.fn();
  const useSearchParams = vi.fn();
  const mockNavigate = vi.fn();
  const mockUseSearchParams = vi.fn();
  const useFetch = vi.fn();
  const useLastSearch = vi.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useLocation.mockReturnValue({ search: '' });
    useSearchParams.mockReturnValue([
      new URLSearchParams(),
      mockUseSearchParams,
    ]);
    useFetch.mockReturnValue([vi.fn(), false, null]);
    useLastSearch.mockReturnValue(['', vi.fn()]);

    useState.mockImplementationOnce((initial) => [[], mockSetHeader]);
    useState.mockImplementationOnce((initial) => [
      {
        name: '',
        description: '',
        errorMessage: '',
      },
      mockSetResults,
    ]);
  });
    useState.mockImplementationOnce((initial) => [mockResults, mockSetFilteredResults]);
    useState.mockImplementationOnce((initial) => [0, mockSetTotalPages]);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should render the ships component', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Ships />
      </MemoryRouter>
    );

    const searchBtn = screen.getByText(/search/i);
    const errBtn = screen.getByText(/throw error/i);
    const searchInput = screen.getByPlaceholderText(/starship name/i);
    

    screen.debug()

    await waitFor(() => {
      expect(searchBtn).toBeInTheDocument();
      expect(errBtn).toBeInTheDocument();
      expect(searchInput).toBeInTheDocument();

    });
  });
});
