import React, { useContext } from 'react';
import { ThemeContext } from 'contexts/theme';
import PropTypes from 'prop-types';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Breadcrumb';

const useStyles = createUseStyles(style);

function Breadcrumb({
  links = [],
}) {
  const classes = useStyles(useContext(ThemeContext));

  const breadcrumb = links.map(({ path, text }, index) => {
    if (links.length - 1 === index) {
      return (
        <li key={path} className={classes.breadcrumb}>
          {text}
        </li>
      );
    }
    return (
      <>
        <li key={path} className={classes.breadcrumb}>
          <a href={path} key={path}>{text}</a>
        </li>
        <span>{' > '}</span>
      </>
    );
  });

  return (
    <>
      <ul>
        {breadcrumb}
      </ul>
    </>
  );
}

Breadcrumb.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
};

export default Breadcrumb;
