import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'contexts/theme';
// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/content/Scores';

const useStyles = createUseStyles(style);

function Scores({ score, quality, difficulty }) {
  const classes = useStyles(useContext(ThemeContext));

  return (
    <>
      <span className={classes.score}>{score}</span>
      <span className={classes.metrics}>{`Quality: ${quality}.`}</span>
      {' '}
      <span className={classes.metrics}>{`Difficulty: ${difficulty}.`}</span>
    </>
  );
}

Scores.propTypes = {
  // The numbers passed to the component from the page
  score: PropTypes.number.isRequired,
  quality: PropTypes.number.isRequired,
  difficulty: PropTypes.number.isRequired,
};

export default Scores;
