import React, { useContext } from 'react';
import GlobalSearch from 'components/data/GlobalSearch';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Header';

const useStyles = createUseStyles(style);

function Navigation() {
  const classes = useStyles(useContext(ThemeContext));

  return (
    <header className={classes.header}>
      <h1 className={classes.title}>Graded Metrics</h1>
      <div className={classes.search}>
        <GlobalSearch />
      </div>
    </header>
  );
}

export default Navigation;
