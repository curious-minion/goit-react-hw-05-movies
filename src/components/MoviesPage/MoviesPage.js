import React, { useState, useRef, Fragment } from 'react';

import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { useInfiniteQuery } from 'react-query';

import axios from 'axios';
import links from '../../services/links';

import Loader from 'react-loader-spinner';
import routes from '../../routes';
import MovieCard from '../HomePage/MovieCard';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Navigation/Navigation.scss';

import './MoviesPage.scss';
import '../HomePage/Homepage.scss';

export default function MoviesPage() {
  const location = useLocation();
  const history = useHistory();
  const [request, setRequest] = useState('');

  const { query } = queryString.parse(location.search);

  const handleRequestChange = event => {
    setRequest(event.currentTarget.value.toLowerCase());
  };

  const handleFormSubmit = request => {
    setRequest('');
    if (request.length === 0) {
      notify();
      return;
    }
    setRequest(request);
    refetch({ refetchPage: (page, index) => index === 0 });
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (request.trim() === '') {
      toast.error('Type in your search request');
      return;
    }
    handleFormSubmit(request);
    onSubmit(request);
  };

  const onSubmit = search => {
    history.push({
      ...location,
      search: `query=${search}`,
    });
  };

  const fetchMovies = async ({ pageParam = 1 }) => {
    const data = await axios(links.searchMovies(request, pageParam));

    // setRequest('');
    return data;
  };

  // console.log(request);
  // console.log(query);

  const {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery('movies', fetchMovies, {
    refetchOnWindowFocus: false,
    enabled: false,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.page < pages[0].data.total_pages)
        return Number(lastPage.data.page + 1);
      return false;
    },
  });

  const notify = () => {
    toast.error('Whoops, something went wrong');
    toast.clearWaitingQueue();
    return;
  };

  if (isLoading)
    return <Loader type="ThreeDots" color="#00BFFF" height={60} width={60} />;
  if (error) return notify();

  return (
    <>
      <header className="Searchbar">
        <form onSubmit={handleSubmit} className="SearchForm">
          <button type="submit" className="SearchForm_button">
            <span className="SearchForm_button_label">Search</span>
          </button>

          <input
            className="SearchForm_input"
            type="text"
            name="searchRequest"
            value={request}
            onChange={handleRequestChange}
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
        </form>
      </header>

      <main>
        {isSuccess &&
          data.pages.map((group, index) => (
            <ul key={index} className="movies_list">
              {isSuccess &&
                group.data.results.map(
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

        {isSuccess && (
          <button
            onClick={() => fetchNextPage()}
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

      <ToastContainer autoClose={2000} limit={1} />
    </>
  );
}
