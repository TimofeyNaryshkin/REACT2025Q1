import getStarships from '../../src/API/StarshipService';
import Header from '../../src/components/Header/Header';
import ResultList from '../../src/components/ResultList/ResultList';
import Pagination from '../../src/components/UI/Pagination/Pagination';
import Flyout from '../../src/components/UI/Flyout/Flyout';
import { useTheme } from '../../src/hooks/useTheme';
import { Route } from './+types/page';
import { Outlet } from 'react-router';

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.page) {
    return;
  }
  const response = await getStarships(params.page);
  return response;
}

export default function Page({ loaderData, params }: Route.ComponentProps) {
  const darkTheme = useTheme();
  if (!loaderData) {
    return;
  }
  const { results, count } = loaderData;
  const { page } = params;
  return (
    <div className={`app ${darkTheme ? 'theme_dark' : ''}`.trim()}>
      <Header />
      <ResultList ships={results} params={params}>
        <Outlet />
      </ResultList>
      <Pagination totalItems={count} page={page} />
      <Flyout />
    </div>
  );
}
