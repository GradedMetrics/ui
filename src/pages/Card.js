import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardImage from 'components/content/CardImage';
import Breadcrumb from 'components/content/Breadcrumb';
import { ThemeContext } from 'contexts/theme';
import { formatObject } from 'js/keys';
import { apiGet } from 'js/api';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Sets';

const useStyles = createUseStyles(style);

function Card() {
  const { setId, cardId } = useParams();
  const classes = useStyles(useContext(ThemeContext));

  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const keys = await apiGet('keys');
      const sets = await apiGet('sets');
      const set = await apiGet(`sets/${setId}`);
      const card = await apiGet(`sets/${setId}/${cardId}`);

      setData(formatObject(keys, {
        set: sets[setId],
        ...formatObject(keys, set).cards.find( ({id}) => id === cardId ),
        ...card,
      }));
    })();
  }, []);
  
  if (!data) {
    return <p>Loading...</p>;
  }

  const {
    set = {},
  } = data;
  
  const {
    name: setName,
  } = set;

  return (
    <>
      <Breadcrumb
        links={[
          {
            text: 'Home',
            path: paths.home,
          }, {
            text: 'Sets',
            path: paths.sets,
          }, {
            text: data ? setName : '...',
            path: paths.set(setId, setName),
          }, {
            text: data ? data.name : '...',
            path: '/card',
          },
        ]}
      />

      <CardImage
        setId={parseInt(setId, 36)}
        cardId={parseInt(cardId, 36)}
        description="Card"
      />
    </>
  );
}

export default Card;
