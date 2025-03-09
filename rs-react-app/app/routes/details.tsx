import { Result } from 'src/types/response';
import { Route } from './+types/details';
import { Link } from 'react-router';

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.id) {
    return;
  }
  const response = await fetch(`https://swapi.dev/api/starships/${params.id}`);
  const data: Result = await response.json();
  return data;
}

export default function Details({
  loaderData: ship,
  params,
}: Route.ComponentProps) {
  if (!ship) {
    return;
  }
  return (
    <div className="details">
      <Link className="details-close" to={`/page/${params.page}`}>
        Close
      </Link>
      <div>{`cost: ${ship.cost_in_credits}`}</div>
      <div>{`crew: ${ship.crew}`}</div>
      <div>{`length: ${ship.length}`}</div>
      <div>{`manufacturer: ${ship.manufacturer}`}</div>
      <div>{`class: ${ship.starship_class}`}</div>
    </div>
  );
}
