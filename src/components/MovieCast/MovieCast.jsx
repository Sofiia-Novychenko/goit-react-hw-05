import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../moviesService/moviesApi';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!movieId) return;
    const getCast = async () => {
      setIsLoading(true);
      setError(false);

      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getCast();
  }, [movieId]);

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {cast.length > 0 && (
        <ul className={styles.container}>
          {cast.map(({ id, name, profile_path, character }) => (
            <li key={id} className={styles.actorCard}>
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                    : defaultImg
                }
                width={150}
                alt={`${name} photo`}
                className={styles.poster}
              />
              <div className={styles.infoContainer}>
                <p className={styles.title}>{name}</p>
                <p className={styles.text}>Character: {character}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
