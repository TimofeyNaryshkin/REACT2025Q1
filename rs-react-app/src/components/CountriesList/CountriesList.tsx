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
  const [sortOrder, setSortOrder] = useState<string>('descending');
  const [sortedCountries, setSortedCountries] = useState<Country[]>([]);

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

  useEffect(() => {
    if (sortOrder === 'ascending') {
      const ascendingSorted = [...filteredCountries].sort(
        (a, b) => a.population - b.population
      );
      setSortedCountries(ascendingSorted);
    }
    if (sortOrder === 'descending') {
      const descendingSorted = [...filteredCountries].sort(
        (a, b) => b.population - a.population
      );
      setSortedCountries(descendingSorted);
    }
  }, [sortOrder, filteredCountries, countries]);

  return (
    <>
      <div className={classes.header}>
        <strong>Name</strong>
        <button
          onClick={() => {
            setSortOrder(
              sortOrder === 'ascending' ? 'descending' : 'ascending'
            );
          }}
        >
          Population
        </button>
        <Filter regions={regions} onChange={setRegion} />
        <strong>Flag</strong>
      </div>
      {sortedCountries.map((country) => (
        <CountryItem key={country.name.common} country={country} />
      ))}
    </>
  );
}
