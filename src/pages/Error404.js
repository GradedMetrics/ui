import React, { useContext } from 'react';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/pages/Error404';

const useStyles = createUseStyles(style);

function Error404() {
  const classes = useStyles(useContext(ThemeContext));
  return (
    <>
      <h1 className={classes.heading}>
        404 &mdash; Sorry.
      </h1>
      <p className={classes.subheading}>
        This page does not exist.
      </p>
    </>
  );
}

export default Error404;
