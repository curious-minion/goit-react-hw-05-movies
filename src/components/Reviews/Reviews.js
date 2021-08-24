import { useQuery } from 'react-query';
import axios from 'axios';

import { useParams } from 'react-router-dom';

import links from '../../services/links';
import Loader from 'react-loader-spinner';

import './Reviews.scss';

export default function Reviews() {
  const { movieId } = useParams();
  const { isLoading, error, data } = useQuery('cast', () =>
    axios(links.getReviews(movieId)),
  );

  if (isLoading)
    return <Loader type="ThreeDots" color="#00BFFF" height={60} width={60} />;
  if (error) return <h3>Something went wrong :( Please try again later</h3>;

  // console.log(data);

  const response = data.data.results;

  // console.log(data.data.results);
  return (
    <>
      {response?.length && response.length > 0 ? (
        <ul>
          {' '}
          {response.map(({ id, author, content }) => {
            return (
              <li key={id} className="comment">
                <p>
                  <strong>{author}</strong>
                </p>
                <p>{content}</p>
              </li>
            );
          })}{' '}
        </ul>
      ) : (
        <p>There are no reviews yet</p>
      )}
    </>
  );
}
