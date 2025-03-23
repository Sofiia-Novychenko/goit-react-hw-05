import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <p>
        404 not found! Please, follow this link to the{' '}
        <Link to="/">Home page</Link>
      </p>
    </>
  );
}
