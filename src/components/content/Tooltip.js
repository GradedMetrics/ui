import React, { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/content/Tooltip';

const useStyles = createUseStyles(style);

function Tooltip({
  children,
  id,
  position = 'bottom',
  text,
}) {
  const classes = useStyles(useContext(ThemeContext));
  const [isVisible, setVisible] = useState(false);
  const containerElem = useRef();

  /**
   * Hide the tooltip.
   */
  function hide() {
    // Ensure the element is no longer focussed.
    containerElem.current.blur();
    setVisible(false);
  }

  /**
   * Show the tooltip.
   */
  function show() {
    setVisible(true);
  }

  return (
    <span
      aria-describedby={id}
      className={classes.tooltip}
      onBlur={hide}
      onFocus={show}
      onMouseOut={hide}
      onMouseOver={show}
      ref={containerElem}
      role="button"
      tabIndex="0"
    >
      <span
        className={isVisible ? classes.visible : classes.hidden}
        id={id}
        role="tooltip"
        style={{
          [position === 'bottom' ? 'top' : 'bottom']: '100%',
        }}
      >
        {text}
      </span>
      {children || (
        <span className={classes.helper}>
          (What is this?)
        </span>
      )}
    </span>
  );
}

Tooltip.defaultProps = {
  children: undefined,
  position: 'bottom',
};

Tooltip.propTypes = {
  /** Content to have the tooltip applied to. */
  children: PropTypes.node,

  /**
   * An ID to apply to the tooltip, referenced by `aria-describedby`.
   * This must be added for accessibility purposes.
   */
  id: PropTypes.string.isRequired,

  /** Where should the tooltip appear in relation to the content? */
  position: PropTypes.oneOf(['bottom', 'top']),

  /** What should the tooltip say? */
  text: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

export default Tooltip;
