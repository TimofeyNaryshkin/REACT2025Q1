import CountryItem from '@components/CountryItem/CountryItem';
import { Country } from 'src/types/types';
import classes from './CountriesList.module.css';
import getRegions from '@utils/getRegions';
import { useEffect, useState } from 'react';
import getCountries from '@services/CountriesService';
import Filter from '@components/UI/Filter/Filter';

export default function CountriesList() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [region, setRegion] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState('descending');
  const [sortedCountries, setSortedCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries();
      setCountries(data);
    };
    fetchData();
  }, []);

  const regions = getRegions(countries);

  useEffect(() => {
    let results = countries;
    if (region !== 'All') {
      results = countries.filter((country) => country.region === region);
    }
    if (searchQuery) {
      results = results.filter((country) =>
        country.name.official
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase())
      );
    }
    setFilteredCountries(results);
  }, [region, countries, searchQuery]);

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
  }, [sortOrder, filteredCountries]);

  return (
    <div className={classes.list}>
      <div className={classes.header}>
        <p>Flag</p>
        <label>
          Name:{' '}
          <input
            type="search"
            list="country-name"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <datalist id="country-name">
          {sortedCountries.map((country) => (
            <option key={country.name.official}>{country.name.official}</option>
          ))}
        </datalist>
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
