import React from 'react';
import Breadcrumb from 'components/content/Breadcrumb';

function Sets() {
  return (
    <>
      <Breadcrumb
        links={[
          {
            text: 'foo',
            path: '/foo',
          }, {
            text: 'bar',
            path: '/bar',
          },
        ]}
      />

      <h2>Sets</h2>

    </>
  );
}

export default Sets;
