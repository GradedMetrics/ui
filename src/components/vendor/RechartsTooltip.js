import React from 'react';
import PropTypes from 'prop-types';

function RechartsTooltip({ payload }) {
  if (!Array.isArray(payload) || !payload.length) {
    return <></>;
  }

  const {
    value = 0,
  } = payload[0];
  return (
    <div>
      Total:
      {value}
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
