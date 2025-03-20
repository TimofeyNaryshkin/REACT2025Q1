import { Country } from 'src/types/types';

export default function getRegions(countries: Country[]) {
  const regionsArray = countries.map((country) => country.region);
  return Array.from(new Set(regionsArray));
}
