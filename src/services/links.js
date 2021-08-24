const KEY = '66ddc044b6b0a1a49855364130b88b2d';

const baseURL = 'https://api.themoviedb.org/3/';

const getTrending = `${baseURL}trending/all/day?api_key=${KEY}`;

const searchMovies = (searchQuery, currentPage) => {
  return `${baseURL}search/movie?api_key=${KEY}&query=${searchQuery}&language=en-US&page=${currentPage}&include_adult=false`;
};

const movieDetails = id => {
  return `${baseURL}movie/${id}?api_key=${KEY}&language=en-US`;
};

const getCast = id => {
  return `${baseURL}movie/${id}/credits?api_key=${KEY}&language=en-US`;
};

const getReviews = id => {
  return `${baseURL}movie/${id}/reviews?api_key=${KEY}&language=en-US&page=1`;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getTrending, searchMovies, movieDetails, getCast, getReviews };
