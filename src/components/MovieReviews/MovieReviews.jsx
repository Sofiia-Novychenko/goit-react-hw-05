import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../moviesService/moviesApi';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import styles from './MovieReviews.module.css';
import { useEffect, useState } from 'react';

export default function MoviesReviews() {
  const { movieId } = useParams();
  const [reviews, setreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!movieId) return;
    const getReviews = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const data = await fetchMovieReviews(movieId);
        setreviews(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getReviews();
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {reviews?.length === 0 && !isLoading && !error && (
        <p>We don't have any reviews for this movie.</p>
      )}
      {reviews.length > 0 && (
        <div className={styles.container}>
          <ul className={styles.list}>
            {reviews.map(({ id, author, content }) => (
              <li key={id} className={styles.itemCard}>
                <p className={styles.title}>Author: {author}</p>
                <p className={styles.text}>"{content}"</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
