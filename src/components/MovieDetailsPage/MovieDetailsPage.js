import { Suspense, lazy } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import {
  Route,
  useLocation,
  useHistory,
  useParams,
  useRouteMatch,
  NavLink,
  Switch,
} from 'react-router-dom';

import MovieInfo from './MovieInfo';
// import AdditionalInfo from './AdditionalInfo';

import links from '../../services/links';
import Loader from 'react-loader-spinner';
import routes from '../../routes';

import '../Navigation/Navigation.scss';
import './MovieDetails.scss';

const Cast = lazy(() => import('../Cast' /*webpackChunkName: "cast" */));

const Reviews = lazy(() =>
  import('../Reviews' /*webpackChunkName: "reviews" */),
);

export default function MovieDetailsPage() {
  const location = useLocation();
  const history = useHistory();
  const { movieId } = useParams();
  const { path, url } = useRouteMatch();

  const { isLoading, error, data } = useQuery('details', () =>
    axios(links.movieDetails(movieId)),
  );

  if (error) return <h3>Something went wrong :( Please try again later</h3>;
  if (isLoading)
    return (
      <h3>
        Loading{' '}
        <Loader type="ThreeDots" color="#00BFFF" height={60} width={60} />
      </h3>
    );

  const onGoBack = () => {
    history.push(location?.state?.from ?? routes.movies);
  };

  return (
    <>
      <button type="button" className="go_back" onClick={onGoBack}>
        Go back
      </button>

      <MovieInfo data={data.data} />

      <div>
        <p className="additional_info">Additional Information</p>
        <ul className="cast_reviews">
          <li className="cast">
            <NavLink
              to={{
                pathname: `${url}${routes.cast}`,
                state: { from: location?.state?.from },
              }}
              className="go_back"
              activeClassName="navigation_button_active"
            >
              Cast
            </NavLink>
          </li>

          <li className="reviews">
            <NavLink
              to={{
                pathname: `${url}${routes.reviews}`,
                state: { from: location?.state?.from },
              }}
              className="go_back"
              activeClassName="navigation_button_active"
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Suspense
        fallback={
          <Loader type="ThreeDots" color="#00BFFF" height={60} width={60} />
        }
      >
        <Switch>
          <Route path={`${path}${routes.cast}`} exact>
            <Cast />
          </Route>
          <Route path={`${path}${routes.reviews}`} exact>
            <Reviews />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
