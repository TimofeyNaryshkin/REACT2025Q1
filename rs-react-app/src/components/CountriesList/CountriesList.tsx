import CountryItem from '@components/CountryItem/CountryItem';
import { Country } from 'src/types/types';
import classes from './CountriesList.module.css';
import getRegions from '@utils/getRegions';
import { useEffect, useState } from 'react';
import getCountries from '@services/CountriesService';
import Filter from '@components/UI/Filter/Filter';

export default function CountriesList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFlteredCountries] = useState<Country[]>([]);
  const [region, setRegion] = useState<string>('All');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries();
      setCountries(data);
    };
    fetchData();
  }, []);

  const regions = getRegions(countries);

  useEffect(() => {
    if (region === 'All') {
      setFlteredCountries(countries);
    } else {
      const results = countries.filter((country) => country.region === region);
      setFlteredCountries(results);
    }
  }, [region, countries]);
  return (
    <>
      <div className={classes.header}>
        <strong>Name</strong>
        <strong>Population</strong>
        <Filter regions={regions} onChange={setRegion} />
        <strong>Flag</strong>
      </div>
      {filteredCountries.map((country) => (
        <CountryItem key={country.name.common} country={country} />
      ))}
    </>
  );
}
