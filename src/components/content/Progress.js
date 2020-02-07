import React from 'react';
import PropTypes from 'prop-types';

function Progress({
  target = 0,
  value = 0,
}) {
  const percentage = (100 / target) * value;

  return (
    <div role="presentation" style={{ background: '#fff', height: '4px', width: '100%' }}>
      <span style={{
        background: '#009734',
        display: 'block',
        height: '100%',
        width: `${percentage}%`,
        transition: 'width 0.5s ease-out',
      }}
      />
    </div>
  );
}

Progress.propTypes = {
  /** The maximum value the progress bar accepts. */
  target: PropTypes.number.isRequired,

  /** The current value. */
  value: PropTypes.number.isRequired,
};

export default Progress;
