import React, { useContext } from 'react';
import GlobalSearch from 'components/data/GlobalSearch';
import { ThemeContext } from 'contexts/theme';
import { Link, NavLink } from 'react-router-dom';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Header';

const useStyles = createUseStyles(style);

function Navigation() {
  const classes = useStyles(useContext(ThemeContext));

  return (
    <header className={classes.header}>
      <h1 className={classes.titleContainer}>
        <Link
          className={classes.title}
          to={paths.home}
        >
          Graded Metrics
        </Link>
      </h1>
      <nav className={classes.navigation}>
        <ul className={classes.list}>
          <li className={classes.listItem}>
            <NavLink
              className={classes.link}
              activeClassName={classes.linkActive}
              to={paths.sets()}
            >
              All Sets
            </NavLink>
          </li>
          <li className={classes.listItem}>
            <NavLink
              className={classes.link}
              activeClassName={classes.linkActive}
              to={paths.top100CardsByScore()}
            >
              Top 100 Cards by Score
            </NavLink>
          </li>
          <li className={classes.listItem}>
            <NavLink
              className={classes.link}
              activeClassName={classes.linkActive}
              to={paths.top100CardsByFewest10s()}
            >
              Top 100 Cards by Fewest PSA 10 Grades
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={classes.search}>
        <GlobalSearch />
      </div>
    </header>
  );
}

export default Navigation;
