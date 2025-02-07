const getStarships = async (page: number) => {
  const response = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
  const data = await response.json();
  return data;
};

export default getStarships;
