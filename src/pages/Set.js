import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from 'components/content/Breadcrumb';
import GenericTable from 'components/content/GenericTable';
import { ThemeContext } from 'contexts/theme';
import { formatObject } from 'js/keys';
import { apiGet } from 'js/api';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Sets';

const useStyles = createUseStyles(style);

function Set() {
  const { setId } = useParams();
  const classes = useStyles(useContext(ThemeContext));

  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const keys = await apiGet('keys');
      const sets = await apiGet('sets');
      const set = await apiGet(`sets/${setId}`);
      setData(formatObject(keys, {
        ...sets[setId],
        ...set,
      }));
    })();
  }, [setId]);

  if (!data) {
    return <p>Loading...</p>;
  }

  const {
    name: setName,
  } = data;

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
            path: '/set',
          },
        ]}
      />

      <h2>Set</h2>

      <GenericTable
        tableHeaders={[{
          sr: 'Number',
          value: '#',
        }, {
          sr: 'Entry',
          value: 'Entry',
        }, {
          sr: 'Set Score',
          value: 'Set Score',
        }, {
          sr: 'Graph',
        }, {
          sr: 'Actions',
        }]}
        tableData={data.cards.map(({
          number,
          difficulty,
          id,
          name,
          popularity = 0,
          quality,
          score = 0,
          variants,
        }) => ({
          key: `set-${id}`,
          value: [{
            key: `set-${id}-number`,
            value: (
              <span>{number}</span>
            ),
          }, {
            key: `set-${id}-name`,
            value: (
              <>
                <span className={classes.name}>
                  <Link
                    to={paths.card(setId, id)}
                  >
                    {name}
                  </Link>
                </span>
                {variants ? <span className={classes.metrics}>{variants.join(', ')}</span> : ''}
              </>
            ),
          }, {
            key: `set-${id}-score`,
            value: (
              <>
                <span className={classes.score}>{score}</span>
                <span className={classes.metrics}>{`Quality: ${quality}.`}</span>
                {' '}
                <span className={classes.metrics}>{`Difficulty: ${difficulty}.`}</span>
                {' '}
                <span className={classes.metrics}>{`Popularity: ${popularity}.`}</span>
              </>
            ),
          }, {
            key: `set-${id}-graph`,
            value: (
              <span>Graph Placeholder</span>
            ),
          }, {
            key: `set-${id}-actions`,
            value: (
              <Link
                to={paths.card(setId, id)}
                className={classes.buttons}
              >
                View
              </Link>
            ),
          }],
        }))}
      />
    </>
  );
}

export default Set;
