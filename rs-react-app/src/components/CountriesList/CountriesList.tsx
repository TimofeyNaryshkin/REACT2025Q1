import CountryItem from "@components/CountryItem/CountryItem"
import getCountries from "@services/CountriesService"
import { useEffect, useState } from "react"
import { Country } from "src/types/types"

export default function CountriesList() {
  const [countries, setCountries] = useState<Country[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries()
      setCountries(data)
    }
    fetchData()
  }, [])
  return (
    countries.map(country => <CountryItem country={country} />)
  )
}