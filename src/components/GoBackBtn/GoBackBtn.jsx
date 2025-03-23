import styles from './GoBackBtn.module.css';
import { Link } from 'react-router-dom';

export default function GoBackBtn({ locationPath }) {
  return (
    <Link to={locationPath} className={styles.btn}>
      Go back
    </Link>
  );
}
