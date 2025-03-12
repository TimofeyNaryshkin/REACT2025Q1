
import { loader } from '../../app/routes/details';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../../src/store/store';
import '@testing-library/jest-dom/vitest';
import Details from '../../app/routes/details';

vi.mock('react-router')

const mockResponse = { 
  name: "Rebel transport",
  model: "GR-75 medium transport",
  manufacturer: "Gallofree Yards, Inc.",
  cost_in_credits: "unknown",
  length: "90",
  max_atmosphering_speed: "650",
  crew: "6",
  passengers: "90",
  cargo_capacity: "19000000",
  consumables: "6 months",
  hyperdrive_rating: "4.0",
  MGLT: "20",
  starship_class: "Medium transport",
  pilots: [],
  films: [],
  created: "2014-12-15T12:34:52.264000Z",
  edited: "2014-12-20T21:23:49.895000Z",
  url: "https://swapi.dev/api/starships/17/"
}

describe('loader', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );
  });
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('should return data when params.id is provided', async () => {

    const params = { page: '1', id: '2' };
    const response = await loader({ params });

    expect(fetch).toHaveBeenCalledWith('https://swapi.dev/api/starships/2');
    expect(response).toEqual(mockResponse);
  });

  it('should return undefined when params.id is not provided', async () => {
    const params = {};
    const response = await loader({ params });

    expect(response).toBeUndefined();
  });
});

describe('Details', () => {
  const mockLoaderData = mockResponse
  const mockParams = { page: '1', id: '1' };
  const store = setupStore()

  it('should render the component with loaderData', () => {

    render(
      <Provider store={store}>
        <Details loaderData={mockLoaderData} params={mockParams} />
      </Provider>
    );

    expect(screen.getByText(/Medium transport/i)).toBeInTheDocument();
  });

  it('should not render if loaderData is not provided', () => {

    const { container } = render(<Details loaderData={undefined} params={mockParams} />);

    expect(container).toBeEmptyDOMElement();
  });
});
