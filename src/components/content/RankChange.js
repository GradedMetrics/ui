import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/content/RankChange';

const useStyles = createUseStyles(style);

function RankChange({
  value = 0,
}) {
  const classes = useStyles(useContext(ThemeContext));

  let className;
  let content;
  let symbol = '';
  let symbolPosition;

  if (value === 0) {
    // No change.
    content = '—';
  } else if (value < 0) {
    // Rank has gone up.
    className = classes.positive;
    content = `+${-value}`;
    symbol = '▲';
    symbolPosition = 'top';
  } else {
    // Rank has gone down.
    className = classes.negative;
    content = `${-value}`;
    symbol = '▼';
    symbolPosition = 'bottom';
  }

  return (
    <span className={`${classes.wrapper}${className ? ` ${className}` : ''}`}>
      {symbolPosition === 'top' ? (
        <span className={classes.symbol}>
          {symbol}
        </span>
      ) : undefined}
      <span className={classes.change}>
        {content}
      </span>
      {symbolPosition === 'bottom' ? (
        <span className={classes.symbol}>
          {symbol}
        </span>
      ) : undefined}
    </span>
  );
}

RankChange.propTypes = {
  /** The rank change value. */
  value: PropTypes.number.isRequired,
};

export default RankChange;
