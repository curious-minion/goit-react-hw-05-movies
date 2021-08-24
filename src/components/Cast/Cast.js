import { useQuery } from 'react-query';
import axios from 'axios';

import { useParams } from 'react-router-dom';

import links from '../../services/links';
import Loader from 'react-loader-spinner';

import './Cast.scss';
import placeholder from '../placeholder.png';

export default function Cast() {
  const { movieId } = useParams();
  const { isLoading, error, data } = useQuery('cast', () =>
    axios(links.getCast(movieId)),
  );

  if (isLoading)
    return <Loader type="ThreeDots" color="#00BFFF" height={60} width={60} />;
  if (error) return <h3>Something went wrong :( Please try again later</h3>;

  // console.log(data);

  // const sortedResponse = Object.entries(data);

  // const castArray = sortedResponse[0][1];
  // const sortedCastArray = Object.entries(castArray);
  // const cast = sortedCastArray[1][1];

  // console.log(cast);
  const cast = data.data.cast;

  return (
    <>
      <ul className="cast_list">
        {cast?.length &&
          cast.map(({ id, profile_path, name, character }) => {
            const picture = profile_path
              ? `https://image.tmdb.org/t/p/w500/${profile_path}`
              : placeholder;
            return (
              <li key={id} className="cast_item">
                <div className="blub">
                  <img src={picture} alt={name} className="cast_image" />
                  <p>{name}</p>
                  <p>
                    <span className="character_text">Character:</span>{' '}
                    {character}
                  </p>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
}
