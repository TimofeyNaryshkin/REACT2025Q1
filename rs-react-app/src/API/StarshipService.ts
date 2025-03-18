import type { IResponse } from 'src/types/response';

const getStarships = async (page: string) => {
  const response = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
  const data: IResponse = await response.json();
  return data;
};

export default getStarships;
