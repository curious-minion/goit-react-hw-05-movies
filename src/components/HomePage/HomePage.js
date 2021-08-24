import { useQuery } from 'react-query';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

import MovieCard from './MovieCard';
import links from '../../services/links';
import Loader from 'react-loader-spinner';
import routes from '../../routes';
import './Homepage.scss';

export default function HomePage() {
  const location = useLocation();
  const { isLoading, error, data } = useQuery('trends', () =>
    axios(links.getTrending),
  );

  if (error)
    return (
      <h3>This page is currently not available. Please try again later</h3>
    );
  if (isLoading)
    return (
      <h3>
        Loading{' '}
        <Loader type="ThreeDots" color="#00BFFF" height={60} width={60} />
      </h3>
    );

  // console.log(data);
  return (
    <>
      <h2 className="heading">Trending today</h2>
      <ul className="movies_list">
        {data.data.results.map(
          ({ id, title, name, poster_path, vote_average }) => (
            <li key={id} className="movies_item">
              <Link
                to={{
                  pathname: `${routes.movies}/${id}`,
                  state: { from: location },
                }}
                className="movie_link"
              >
                <MovieCard
                  name={title ?? name}
                  image={poster_path}
                  rating={vote_average}
                />
              </Link>
            </li>
          ),
        )}
      </ul>
    </>
  );
}
