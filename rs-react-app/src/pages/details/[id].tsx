import Loader from '../../components/UI/Loader/Loader';
import { useAppSelector } from '../../hooks/redux';
import { starshipAPI } from '../../services/starship';
import { DetailsProps } from '../../types/types';
import Button from '@/components/UI/Button';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Result } from 'types/response';

export const getServerSideProps = (async (context) => {
  const { id } = context.query;
  // Fetch data from external API
  const res = await fetch(`https://swapi.dev/api/starships/${id}`);
  const ship: Result = await res.json();
  // Pass data to the page via props
  return { props: { ship } };
}) satisfies GetServerSideProps<{
  ship: Result;
}>;

export default function ({
  ship,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  //const { isOpened } = useAppSelector((state) => state.detailsReducer);
  /* const {
    data: ship,
    isFetching,
    error,
  } = starshipAPI.useFetchShipDetailsQuery(query.id); */

  return (
    <div className="details">
      {ship ? (
        <>
          <Button
            className="details-close"
            onButtonClick={() => console.log('123')}
          >
            Close
          </Button>
          <div>{`cost: ${ship.cost_in_credits}`}</div>
          <div>{`crew: ${ship.crew}`}</div>
          <div>{`length: ${ship.length}`}</div>
          <div>{`manufacturer: ${ship.manufacturer}`}</div>
          <div>{`class: ${ship.starship_class}`}</div>
        </>
      ) : null}
    </div>
  );
}
