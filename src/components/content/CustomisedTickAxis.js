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

CustomisedTickAxis.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  payload: PropTypes.number.isRequired,
};

export default CustomisedTickAxis;
