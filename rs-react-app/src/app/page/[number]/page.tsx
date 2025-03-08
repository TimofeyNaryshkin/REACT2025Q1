import Layout from '@/components/Layout';
import ResultList from '@/components/ResultList/ResultList';
import { IResponse } from 'types/response';

async function getShips(page: string) {
  const response = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
  const ships: IResponse = await response.json();
  return ships;
}

export default async function ShipsPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const ships = await getShips(number || '1');
  return <Layout totalItems={ships.count}><ResultList ships={ships.results} /></Layout>;
}
