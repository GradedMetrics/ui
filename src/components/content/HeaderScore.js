import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'contexts/theme';
// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/content/HeaderScore';

const useStyles = createUseStyles(style);

function HeaderScore({
  title, score, quality, difficulty, popularity,
}) {
  const classes = useStyles(useContext(ThemeContext));

  return (
    <dl className={classes.infoGroupMetrics}>
      <dt className={classes.setScore}>
        {title}
        <span className={classes.setScoreNumber}>
          {' '}
          {score}
        </span>
      </dt>
      <dd className={classes.setMetrics}>{`Quality: ${quality}`}</dd>
      {' · '}
      <dd className={classes.setMetrics}>{`Difficulty: ${difficulty}`}</dd>
      {' · '}
      <dd className={classes.setMetrics}>{`Popularity: ${popularity}`}</dd>
    </dl>
  );
}

HeaderScore.propTypes = {
  title: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  quality: PropTypes.number.isRequired,
  difficulty: PropTypes.number.isRequired,
  popularity: PropTypes.number.isRequired,
};

export default HeaderScore;
