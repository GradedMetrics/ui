import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/content/LinkButton';

const useStyles = createUseStyles(style);

function LinkButton({
  path,
  text,
}) {
  const classes = useStyles(useContext(ThemeContext));

  return (
    <Link
      to={path}
      className={classes.linkButton}
    >
      {text}
    </Link>
  );
}

LinkButton.propTypes = {
  // The url path to be used
  path: PropTypes.string.isRequired,

  // The text which the button must display
  text: PropTypes.string.isRequired,
};

export default LinkButton;
