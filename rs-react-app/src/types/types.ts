export interface Counties {}

export interface CountryItemProps {
  country: Country;
}

export interface Country {
  name: Name;
  population: number;
  region: string;
  flags: Flags;
}

interface Name {
  common: string;
  official: string;
}

interface Flags {
  png: string;
  svg: string;
  alt: string;
}
