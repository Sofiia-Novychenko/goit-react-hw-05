import { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { fetchMovieDetails } from '../../moviesService/moviesApi';
import styles from './MovieDetailsPage.module.css';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import GoBackBtn from '../../components/GoBackBtn/GoBackBtn';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkHref = useRef(location.state ?? '/movies');

  useEffect(() => {
    if (!movieId) return;
    const getMovieDetails = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);
  return (
    <>
      <GoBackBtn locationPath={backLinkHref.current} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movie ? (
        <>
          <MovieDetails movie={movie} />
          <div className={styles.container}>
            <p className={styles.text}>Additional information: </p>
            <ul className={styles.list}>
              <li className={styles.item}>
                <Link to="cast" className={styles.link}>
                  Cast
                </Link>
              </li>
              <li className={styles.item}>
                <Link to="reviews" className={styles.link}>
                  Review
                </Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </>
      ) : null}
    </>
  );
}
