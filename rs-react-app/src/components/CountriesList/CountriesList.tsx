import CountryItem from '@components/CountryItem/CountryItem';
import { Country } from 'src/types/types';
import classes from './CountriesList.module.css';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import getCountries from '@services/CountriesService';
import Filter from '@components/UI/Filter/Filter';

export default function CountriesList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [region, setRegion] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries();
      setCountries(data);
    };
    fetchData();
  }, []);

  const regions = useMemo(() => {
    const regionsArray = countries.map((country) => country.region);
    return Array.from(new Set(regionsArray));
  }, [countries]);

  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      return (
        (region === 'All' || country.region === region) &&
        country.name.official
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase())
      );
    });
  }, [countries, region, searchQuery]);

  const sortedCountries = useMemo(() => {
    if (sortOrder === 'ascending') {
      return [...filteredCountries].sort((a, b) => a.population - b.population);
    }
    if (sortOrder === 'descending') {
      return [...filteredCountries].sort((a, b) => b.population - a.population);
    }
    return filteredCountries;
  }, [sortOrder, filteredCountries]);

  const sort = useCallback(() => {
    setSortOrder(sortOrder === 'ascending' ? 'descending' : 'ascending');
  }, [sortOrder]);

  const search = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <div className={classes.list}>
      <div className={classes.header}>
        <p>Flag</p>
        <label>
          Name:{' '}
          <input
            type="search"
            list="country-name"
            onChange={search}
            value={searchQuery}
          />
        </label>
        <datalist id="country-name">
          {sortedCountries.map((country) => (
            <option key={country.name.official}>{country.name.official}</option>
          ))}
        </datalist>
        <button onClick={sort}>Population</button>
        <Filter regions={regions} onChange={setRegion} />
      </div>
      {sortedCountries.length ? (
        sortedCountries.map((country) => (
          <CountryItem key={country.name.common} country={country} />
        ))
      ) : (
        <h2>Nothing found D:</h2>
      )}
    </div>
  );
}
