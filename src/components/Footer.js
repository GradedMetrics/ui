import React, { useContext } from 'react';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Footer';

const useStyles = createUseStyles(style);

function Footer() {
  const classes = useStyles(useContext(ThemeContext));

  return (
    <footer className={classes.footer}>
      <p>
        &copy; Graded Metrics (https://gradedmetrics.com)
      </p>
    </footer>
  );
}

export default Footer;
