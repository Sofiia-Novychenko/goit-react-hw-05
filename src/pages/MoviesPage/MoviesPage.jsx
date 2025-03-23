import { useEffect, useState } from 'react';
import styles from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';
import { fetchMovieByName } from '../../moviesService/moviesApi';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const movieName = searchParams.get('movieName') ?? '';
  const [debouncedMovieName] = useDebounce(movieName, 1000);

  useEffect(() => {
    if (!debouncedMovieName.trim()) return;

    const getMovieByName = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await fetchMovieByName(debouncedMovieName.trim());
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieByName();
  }, [debouncedMovieName]);

  const updateSearchQuery = evt => {
    const nextParams = new URLSearchParams(searchParams);
    if (evt.target.value !== '') {
      nextParams.set('movieName', evt.target.value);
    } else {
      nextParams.delete('movieName');
    }
    setSearchParams(nextParams);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const movieName = form.elements.movieName.value.trim();
    setSearchParams({ movieName });

    form.reset();
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="movieName"
            autoComplete="off"
            autoFocus
            placeholder="Search movies..."
            className={styles.input}
            value={movieName}
            onChange={updateSearchQuery}
          />
          <button type="submit" className={styles.btn}>
            Search
          </button>
        </form>
      </div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </>
  );
}
