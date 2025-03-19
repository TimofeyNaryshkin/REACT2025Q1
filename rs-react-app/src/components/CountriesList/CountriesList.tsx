import CountryItem from '@components/CountryItem/CountryItem';
import { CountriesListProps } from 'src/types/types';

export default function CountriesList({ countries }: CountriesListProps) {
  return countries.map((country) => (
    <CountryItem key={country.name.common} country={country} />
  ));
}
