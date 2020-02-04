import React from 'react';
import Breadcrumb from 'components/content/Breadcrumb';
import SetsTable from 'components/content/Sets/SetsTable';

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

      <SetsTable />
    </>
  );
}

export default Sets;
