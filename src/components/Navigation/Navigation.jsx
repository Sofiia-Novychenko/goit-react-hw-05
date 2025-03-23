import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';
import clsx from 'clsx';

const getLinkStyles = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);
};

export default function Navigation() {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <NavLink to="/" className={getLinkStyles}>
                Home
              </NavLink>
            </li>
            <li className={styles.item}>
              <NavLink to="/movies" className={getLinkStyles}>
                Movies
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
