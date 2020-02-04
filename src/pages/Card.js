import React from 'react';
import CardImage from 'components/content/CardImage';
import Breadcrumb from 'components/content/Breadcrumb';

function Card() {
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

      <CardImage
        setId="57801"
        cardId="1724724"
        description="Card"
      />
    </>
  );
}

export default Card;
