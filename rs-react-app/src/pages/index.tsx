import Layout from '@/components/Layout';
import ResultList from '@/components/ResultList/ResultList';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { IResponse } from 'types/response';

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const response = await fetch('https://swapi.dev/api/starships/?page=1');
  const ships: IResponse = await response.json();
  if (!ships) {
    return {
      notFound: true,
    };
  }
  // Pass data to the page via props
  return { props: { ships } };
}) satisfies GetServerSideProps<{
  ships: IResponse;
}>;

export default function Ships({
  ships,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout totalItems={ships.count}>
      <ResultList ships={ships.results} />
    </Layout>
  );
}
