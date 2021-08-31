import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';

import queryString from 'query-string';
import { useInfiniteQuery } from 'react-query';
import axios from 'axios';

import links from '../../services/links';
import Loader from 'react-loader-spinner';
import routes from '../../routes';
import MovieCard from '../HomePage/MovieCard';
import SearchBar from './SearchBar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Navigation/Navigation.scss';
import './MoviesPage.scss';
import '../HomePage/Homepage.scss';

export default function MoviesPage() {
  const location = useLocation();
  const history = useHistory();
  const { query } = queryString.parse(location.search);

  const [request, setRequest] = useState('');

  useEffect(() => {
    if (query) setRequest(query);
  }, [query]);

  const fetchMovies = async ({ pageParam = 1 }) => {
    return await axios(links.searchMovies(request, pageParam));
  };

  const {
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isFetchingNextPage,
    data,
    isLoading,
    error,
  } = useInfiniteQuery(['movies', request], fetchMovies, {
    enabled: !!request,
    getNextPageParam: ({ data: lastPage }, allPages) => {
      if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
      return false;
    },
  });

  const handleSubmit = query => {
    history.push({
      ...location,
      search: `query=${query}`,
    });
    setRequest(query);
  };

  const notify = () => {
    toast.error('Whoops, something went wrong');
    toast.clearWaitingQueue();
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <main>
        {isLoading && (
          <Loader type="ThreeDots" color="#00BFFF" height={60} width={60} />
        )}
        {isSuccess &&
          data.pages.map((group, index) => (
            <ul key={index} className="movies_list">
              {group.data.results.map(
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
          ))}
        ​
        {isSuccess && (
          <button
            onClick={fetchNextPage}
            disabled={!hasNextPage || isFetchingNextPage}
            className="go_back load"
          >
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
          </button>
        )}
      </main>

      {error && notify()}
      <ToastContainer autoClose={2000} limit={1} />
    </>
  );
}
