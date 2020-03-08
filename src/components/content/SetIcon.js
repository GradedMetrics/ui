import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'contexts/theme';
import { getSetIconPath } from 'js/img';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/content/SetIcon';

const useStyles = createUseStyles(style);

function SetIcon({
  filename,
  set,
}) {
  const classes = useStyles(useContext(ThemeContext));

  return (
    <img
      className={classes.setIcon}
      src={getSetIconPath(filename)}
      alt={`The set icon for ${set}`}
    />
  );
}

SetIcon.propTypes = {
  /** The filename of the icon (e.g. 2uua.png). */
  filename: PropTypes.string.isRequired,

  /** The name of the set. */
  set: PropTypes.string.isRequired,
};

export default SetIcon;
