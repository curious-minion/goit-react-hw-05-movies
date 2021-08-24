import React, { useState } from 'react';

import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { useInfiniteQuery } from 'react-query';

import axios from 'axios';
import links from '../../services/links';

import Loader from 'react-loader-spinner';

export default function MoviesPage() {
  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();
  const { searchQuery } = queryString.parse(location.search);

  const [request, setRequest] = useState('');

  const handleRequestChange = event => {
    setRequest(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (request.trim() === '') {
      alert('Error');
      //   toast.error('Type in your search request');
      return;
    }

    onSubmit(request);
    setRequest('');
  };

  const onSubmit = query => {
    history.push({
      pathname: location.pathname,
      search: `query=${query}`,
    });
  };

  const fetchMovies = ({ nextPage = 1 }) => {
    const response = axios(links.searchMovies(searchQuery, nextPage));
    return {
      data: response,
      nextPage: nextPage + 1,
    };
  };

  const {
    data,
    error,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    hasNextPage,
  } = useInfiniteQuery('movies', fetchMovies, {
    getNextPage: (lastGroup, allGroups) => lastGroup.nextPage,
  });

  const paginatedData = [];
  data.forEach(page => {
    page.data.forEach(char => {
      paginatedData.push(char);
    });
  });

  console.log(paginatedData);

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
    </>
  );

  //     return status === 'loading' ? (
  //      <Loader type="ThreeDots" color="#00BFFF" height={60} width={60} />
  //    ) : status === 'error' ? (
  //      <p>Error: {error.message}</p>
  //    ) : (
  //      <>
  //        {data.pages.map((group, i) => (
  //          <React.Fragment key={i}>
  //            {group.projects.map(project => (
  //              <p key={project.id}>{project.name}</p>
  //            ))}
  //          </React.Fragment>
  //        ))}
  //        <div>
  //          <button
  //            onClick={() => fetchNextPage()}

  //            disabled={!hasNextPage || isFetchingNextPage}
  //          >
  //            {isFetchingNextPage
  //              ? 'Loading more...'
  //              : hasNextPage
  //              ? 'Load More'
  //              : 'Nothing more to load'}
  //          </button>

  //        </div>

  //        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>

  //      </>

  //    )
}
