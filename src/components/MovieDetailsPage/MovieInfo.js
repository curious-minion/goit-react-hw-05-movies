// import PropTypes from 'prop-types';
import './MovieDetails.scss';
import placeholder from '../placeholder.png';

const MovieInfo = data => {
  const {
    genres,
    title,
    release_date,
    vote_average,
    overview,
    poster_path,
    name,
  } = data.data;

  const picture = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : placeholder;

  const score = vote_average * 10;
  const date = release_date.slice(0, 4);
  const heading = title ?? name;
  return (
    <article className="movie_description">
      <img src={picture} alt={name} className="movie_poster" />
      <div className="movie_info">
        {heading && (
          <h2>
            {heading} {date ? <span>({date})</span> : null}
          </h2>
        )}
        <p>
          <strong>User Score: </strong>
          {score ? <span>{score} %</span> : null}
        </p>

        <p>
          <strong>Overview: </strong>
          {overview ? <span>{overview}</span> : <span>Not available</span>}
        </p>

        <p>
          <strong>Genres: </strong>
          {genres
            ? genres.map(({ id, name }) => (
                <li key={id} className="genres">
                  {' '}
                  {name}
                </li>
              ))
            : null}
        </p>
      </div>
    </article>
  );
};

export default MovieInfo;
