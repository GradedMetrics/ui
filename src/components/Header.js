import React, {useContext} from 'react';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss'
import style from 'styles/components/Header';

const useStyles = createUseStyles(style);

function Navigation() {
  
  const classes = useStyles(useContext(ThemeContext));

  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Graded Metrics</h1>
      </header>
    </React.Fragment>
  );
}

export default Navigation;
