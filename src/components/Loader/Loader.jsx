import { FadeLoader } from 'react-spinners';
import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <FadeLoader color="#3B82F6" />
    </div>
  );
}
