import React, { useContext, useEffect, useState } from 'react';
import Breadcrumb from 'components/content/Breadcrumb';
import GenericTable from 'components/content/GenericTable';
import { ThemeContext } from 'contexts/theme';
import { formatYear } from 'js/formats';
import { formatObjectArray } from 'js/keys';
import { apiGet } from 'js/api';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Sets';

const useStyles = createUseStyles(style);

function Sets() {
  const classes = useStyles(useContext(ThemeContext));

  const [data, setData] = useState();

  useEffect( () => {
    (async () => {
      const keys = await apiGet('keys');
      const sets = await apiGet('sets');
      setData(formatObjectArray(keys, Object.values(sets)));
    })();
  }, []);

  let content;
  console.log(data);
  
  if (!data) {
    content = <p>Loading...</p>;
  }
  else if ( !data.length ) {
    content = <p>No data found.</p>
  }
  else {
    content = (
      <GenericTable
      tableHeaders={[{
        sr: 'Name',
        value: 'Name',
      }, {
        sr: 'GM Score',
        value: 'GM Score',
      }, {
        sr: 'Graph',
      }, {
        sr: 'Actions',
      }]}
      tableData={data.map(({
        cards,
        difficulty,
        id,
        name,
        popularity = 0,
        quality,
        score = 0,
        variant,
        year,
      }) => ({
        key: `set-${id}`,
        value: [{
          key: `set-${id}-name`,
          value: (
            <>
              <span className={classes.name}>
                {'Pokemon '}
                {name}
                {variant ? ` (${variant})` : ''}
              </span>
              <span className={classes.yearCards}>
                {`${formatYear(year)} · ${cards} cards`}
              </span>
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
            <a className={classes.buttons}>View</a>
          ),
        }],
      }))}
    />
    )
  }

  return (
    <>
      <Breadcrumb
        links={[
          {
            text: 'Home',
            path: '/home',
          }, {
            text: 'Sets',
            path: '/sets',
          },
        ]}
      />

      <h2>Sets</h2>

      {content}
    </>
  );
}

export default Sets;
