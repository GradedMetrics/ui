import React from 'react';
import PropTypes from 'prop-types';

function RechartsTooltip({ payload }, axes) {
  if (!Array.isArray(payload) || !payload.length) {
    return <></>;
  }

  const parts = axes.map(({ label }, index) => {
    const {
      value = 0,
    } = payload[index];

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
    value: PropTypes.number,
  })),
};

export default RechartsTooltip;
