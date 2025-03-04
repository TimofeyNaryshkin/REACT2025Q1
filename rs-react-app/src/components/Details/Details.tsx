import { Result } from 'types/response';
import Button from '../UI/Button';

export default function Details({ ship }: { ship: Result }) {
  //const { isOpened } = useAppSelector((state) => state.detailsReducer);
  /* const {
    data: ship,
    isFetching,
    error,
  } = starshipAPI.useFetchShipDetailsQuery(query.id); */

  return (
    <div className="details">
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
    </div>
  );
}
