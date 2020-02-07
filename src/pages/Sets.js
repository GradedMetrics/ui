import React, { useContext } from 'react';
import Breadcrumb from 'components/content/Breadcrumb';
import GenericTable from 'components/content/GenericTable';
import { ThemeContext } from 'contexts/theme';
import keys from 'js/keys.json';
import sets from 'js/sets.json';
import { formatYear } from 'js/formats';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Sets';

const useStyles = createUseStyles(style);

function Sets() {
  const classes = useStyles(useContext(ThemeContext));

  const formattedSets = (
    Object.values(sets).map((set) => Object.entries(set).reduce((obj, [key, value]) => {
      const k = Object.entries(keys).find((entry) => entry[1] === key);
      return {
        ...obj,
        [k[0]]: value,
      };
    }, {}))
  );

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
        tableData={formattedSets.map(({
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
                <span className={classes.metrics}>{`Quality: ${quality}. Difficulty: ${difficulty}. Popularity: ${popularity}.`}</span>
              </>
            ),
          }, {
            key: `set-${id}-graph`,
            value: undefined,
          }, {
            key: `set-${id}-actions`,
            value: undefined,
          }],
        }))}
      />
    </>
  );
}

export default Sets;
