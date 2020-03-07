import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from 'js/formats';

function RechartsTooltip({ payload }, axes, classes) {
  if (!Array.isArray(payload) || !payload.length) {
    return <></>;
  }

  const {
    payload: payloads = {},
  } = payload[0];

  const parts = [...axes].reverse().map(({ key, label }) => {
    const value = payloads[key] || 0;

    return (
      <div
        className={`${classes.entry} ${classes[`${key}Label`]}`}
        key={`tooltip-entry-${label}`}
      >
        {label}
:
        {' '}
        {value.toLocaleString()}
      </div>
    );
  });

  const {
    date,
  } = payloads;

  return (
    <div className={classes.tooltip}>
      <div className={classes.tooltipTitle}>
        {formatDate(new Date(Number(date)))}
      </div>
      {parts}
    </div>
  );
}

RechartsTooltip.defaultProps = {
  payload: undefined,
};

RechartsTooltip.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape({
    payload: PropTypes.objectOf(PropTypes.number).isRequired,
  })),
};

export default RechartsTooltip;
