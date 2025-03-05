import Layout from '@/components/Layout';
import ResultList from '@/components/ResultList/ResultList';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { IResponse } from 'types/response';

export const getServerSideProps = (async () => {
  // Fetch data from external API
  const response = await fetch('https://swapi.dev/api/starships/?page=1');
  const ships: IResponse = await response.json();
  if (!ships) {
    return {
      notFound: true,
    }
  }
  // Pass data to the page via props
  return { props: { ships } };
}) satisfies GetServerSideProps<{
  ships: IResponse;
}>;

export default function Ships({
  ships,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter()
  useEffect(() => {
    router.push('/page/1', undefined, {shallow: true})
  }, [])
  return (
    <Layout>
      <ResultList ships={ships} />
    </Layout>
  );
}
