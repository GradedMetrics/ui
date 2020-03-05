import React from 'react';
import PropTypes from 'prop-types';

function RechartsTooltip({ payload }, axes) {
  if (!Array.isArray(payload) || !payload.length) {
    return <></>;
  }

  const {
    payload: payloads = {},
  } = payload[0];

  const parts = axes.map(({ key, label }) => {
    const value = payloads[key] || 0;

    return (
      <div key={`tooltip-entry-${label}`}>
        {label}
:
        {' '}
        {value.toLocaleString()}
      </div>
    );
  });

  return (
    <div>
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
