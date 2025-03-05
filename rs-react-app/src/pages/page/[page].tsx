import Layout from '@/components/Layout';
import ResultList from '@/components/ResultList/ResultList';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { IResponse } from 'types/response';

export const getServerSideProps = (async ({ query }) => {
  // Fetch data from external API
  const { page } = query;
  const response = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
  const ships: IResponse = await response.json();
  // Pass data to the page via props
  return { props: { ships } };
}) satisfies GetServerSideProps<{
  ships: IResponse;
}>;

export default function Ships({
  ships,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <ResultList ships={ships} />
    </Layout>
  );
}
