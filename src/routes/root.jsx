import { Link, Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <div id='sidebar'>
        <h1>My Projects</h1>

        <nav>
          <ul>
            <li key={1}>
              <Link to={`pagination`}>Pagination</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id='detail'>
        <Outlet />
      </div>
    </>
  );
}
