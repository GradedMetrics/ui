import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from 'js/formats';

function CustomisedTickAxis({ x = 0, y = 0, payload }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x="0" y="5" textAnchor="end" fill="#666" transform="rotate(-75)">
        {formatDate(new Date(payload.value))}
      </text>
    </g>
  );
}

CustomisedTickAxis.defaultProps = {
  x: 0,
  y: 0,
  payload: {},
};

CustomisedTickAxis.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.shape({
    value: PropTypes.number.isRequired,
  }),
};

export default CustomisedTickAxis;
