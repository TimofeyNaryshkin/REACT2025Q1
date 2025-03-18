
import { loader } from '../../app/routes/page';
import getStarships from '../../src/API/StarshipService';
import { describe, expect, it, Mock, vi } from 'vitest';
import { useTheme } from '../../src/hooks/useTheme';
import Page from '../../app/routes/page'
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../../src/store/store';
import '@testing-library/jest-dom/vitest';

vi.mock('../../src/API/StarshipService');
vi.mock('../../src/hooks/useTheme')
vi.mock('react-router')

describe('loader', () => {
  it('should return data when params.page is provided', async () => {
    const mockResponse = { results: [], count: 0 };
    (getStarships as Mock).mockResolvedValue(mockResponse);

    const params = { page: '1' };
    const response = await loader({ params });

    expect(getStarships).toHaveBeenCalledWith('1');
    expect(response).toEqual(mockResponse);
  });

  it('should return undefined when params.page is not provided', async () => {
    const params = {};
    const response = await loader({ params });

    expect(response).toBeUndefined();
  });
});

describe('Page', () => {
  const mockLoaderData = {
    results: [{ name: 'Millennium Falcon' }],
    count: 1,
  };
  const mockParams = { page: '1' };
  const store = setupStore()

  it('should render the component with loaderData', () => {
    (useTheme as Mock).mockReturnValue(false);

    render(
      <Provider store={store}>
        <Page loaderData={mockLoaderData} params={mockParams} />
      </Provider>
    );

    expect(screen.getByText('Millennium Falcon')).toBeInTheDocument();
  });

  it('should not render if loaderData is not provided', () => {
    (useTheme as Mock).mockReturnValue(false);

    const { container } = render(<Page loaderData={undefined} params={mockParams} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should apply dark theme when darkTheme is true', async () => {
    (useTheme as Mock).mockReturnValue(true);

    render(
      <Provider store={store}>
        <Page loaderData={mockLoaderData} params={mockParams} />
      </Provider>
    );

    await waitFor(() => {
      const appDiv = screen.getByTestId('header').parentElement;
      expect(appDiv).toHaveClass('theme_dark');
    })
    
  });
});

