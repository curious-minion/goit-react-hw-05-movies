import PropTypes from 'prop-types';

import './Homepage.scss';
import placeholder from '../placeholder.png';

const MovieCard = ({ name, image, rating }) => {
  const picture = image
    ? `https://image.tmdb.org/t/p/w500/${image}`
    : placeholder;

  // const ratingSign = rating > 6 ? "high" : "low";

  return (
    <div className="movie_card">
      <img src={picture} alt={name} className="movie_image" />
      <div>
        {rating ? (
          <strong className={rating > 5.5 ? 'high' : 'low'}>{rating}</strong>
        ) : null}
      </div>
    </div>
  );
};

MovieCard.defaultProps = {
  image: '',
  rating: null,
};

MovieCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  rating: PropTypes.number,
};

export default MovieCard;
