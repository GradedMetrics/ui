import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from 'components/content/Breadcrumb';
import Chart from 'components/content/Chart';
import LinkButton from 'components/content/LinkButton';
import GenericTable from 'components/content/GenericTable';
import { ThemeContext } from 'contexts/theme';
import { formatObject } from 'js/keys';
import { apiGet } from 'js/api';
import { paths } from 'js/routes';
import { formatYear } from 'js/formats';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Set';

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
    year,
    cards,
    difficulty: setDifficulty,
    popularity: setPopularity,
    quality: setQuality,
    score: setScore = 0,
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
            path: paths.sets(),
          }, {
            text: data ? setName : '...',
            path: '/set',
          },
        ]}
      />

      <h2 className={classes.setName}>{setName}</h2>
      <p className={classes.setInfo}>{`${formatYear(year)} · ${cards.length} cards`}</p>

      <dl>
        <dt className={classes.setScore}>
          GM Score
          <span className={classes.setScoreNumber}>
            {' '}
            {setScore}
          </span>
        </dt>
        <dd className={classes.setMetrics}>{`Quality: ${setQuality}`}</dd>
        {' · '}
        <dd className={classes.setMetrics}>{`Difficulty: ${setDifficulty}`}</dd>
        {' · '}
        <dd className={classes.setMetrics}>{`Popularity: ${setPopularity}`}</dd>
      </dl>

      <GenericTable
        tableHeaders={[{
          sr: 'Number',
          value: '#',
        }, {
          value: 'Entry',
        }, {
          value: 'Set Score',
        }, {
          value: 'Total cards graded over time',
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
          total,
          history = [],
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
              <Chart
                data={[
                  total,
                  ...history,
                ].reverse()}
              />
            ),
          }, {
            key: `set-${id}-actions`,
            value: (
              <LinkButton
                path={paths.card(setId, id)}
                text="View"
              />
            ),
          }],
        }))}
      />
    </>
  );
}

export default Set;
