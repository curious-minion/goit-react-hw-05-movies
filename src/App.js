import React, { Suspense, lazy } from 'react';

import { Route, Switch } from 'react-router-dom';

import Loader from 'react-loader-spinner';
import Container from './components/Container';
import Navigation from './components/Navigation';

import routes from './routes';

const HomePage = lazy(() =>
  import('./components/HomePage' /*webpackChunkName: 'home-page' */),
);

// const MoviesPage = lazy(() => import('./components/MoviesPage' /*webpackChunkName: 'movies-page' */),);
const MovieDetailsPage = lazy(() =>
  import(
    './components/MovieDetailsPage' /*webpackChunkName: 'movie-details-page' */
  ),
);
const PageNotFound = lazy(() =>
  import('./components/PageNotFound' /*webpackChunkName: 'error-404' */),
);

export default function App() {
  return (
    <Container>
      <Navigation />

      <Suspense
        fallback={
          <h3>
            Loading{' '}
            <Loader type="ThreeDots" color="#00BFFF" height={60} width={60} />
          </h3>
        }
      >
        <Switch>
          <Route path={routes.home} exact component={HomePage} />
          {/* <Route  path={routes.movies} exact component={MoviesPage} /> */}
          <Route path={routes.movieDetails} component={MovieDetailsPage} />
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </Container>
  );
}
