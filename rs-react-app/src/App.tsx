import CountriesList from '@components/CountriesList/CountriesList';
import './App.css';
import { useEffect, useState } from 'react';
import { Country } from './types/types';
import getCountries from '@services/CountriesService';
import Filter from '@components/UI/Filter/Filter';
import getRegions from '@utils/getRegions';

function App() {
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
      <Filter regions={regions} onChange={setRegion} />
      <CountriesList countries={filteredCountries} />
    </>
  );
}

export default App;
