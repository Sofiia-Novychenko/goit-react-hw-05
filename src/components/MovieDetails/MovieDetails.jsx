import styles from './MovieDetails.module.css';
export default function MovieDetails({
  movie: { poster_path, title, release_date, vote_average, overview, genres },
}) {
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  return (
    <>
      <div className={styles.container}>
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : defaultImg
          }
          width={400}
          alt={title}
          className={styles.poster}
        />
        <div className={styles.infoContainer}>
          <h2 className={styles.title}>
            {title} ({release_date.slice(0, 4)})
          </h2>
          <p className={styles.text}>
            User Score: {Math.round(vote_average * 10)}%
          </p>
          <h3 className={styles.subTitle}>Overview</h3>
          <p className={styles.text}>{overview}</p>
          <h3 className={styles.subTitle}>Genres</h3>
          <p className={styles.text}>
            {genres.map(genre => genre.name).join(', ')}
          </p>
        </div>
      </div>
    </>
  );
}
