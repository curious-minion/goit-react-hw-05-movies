import { NavLink } from 'react-router-dom';
import routes from '../../routes';

import './Navigation.scss';

export default function Navigation() {
  return (
    <nav>
      <NavLink
        exact
        to={routes.home}
        className="navigation_button"
        activeClassName="navigation_button_active"
      >
        Home
      </NavLink>
      <NavLink
        exact
        to={routes.movies}
        className="navigation_button"
        activeClassName="navigation_button_active"
      >
        Movies
      </NavLink>
    </nav>
  );
}
