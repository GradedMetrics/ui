import React from 'react';

function Breadcrumb({
  links,
}) {
  return links.map(({ path, text }, index) => {
    if (links.length - 1 === index) {
      return (
        <span key={path}>{text}</span>
      );
    }
    return (
      <>
        <a href={path} key={path}>{text}</a>
        {' > '}
      </>
    );
  });
}

export default Breadcrumb;
