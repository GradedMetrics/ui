import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from 'components/content/Breadcrumb';
import Chart from 'components/content/Chart';
import GenericTable from 'components/content/GenericTable';
import LinkButton from 'components/content/LinkButton';
import SetIcon from 'components/content/SetIcon';
import { ThemeContext } from 'contexts/theme';
import { formatYear } from 'js/formats';
import { formatObjectArray } from 'js/keys';
import { apiGet } from 'js/api';
import { paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Sets';

const useStyles = createUseStyles(style);

function Sets() {
  const classes = useStyles(useContext(ThemeContext));

  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const keys = await apiGet('keys');
      const sets = await apiGet('sets');
      setData(formatObjectArray(keys, Object.values(sets)));
    })();
  }, []);

  let content;

  if (!data) {
    content = <p>Loading...</p>;
  } else if (!data.length) {
    content = <p>No data found.</p>;
  } else {
    content = (
      <GenericTable
        tableHeaders={[{
          sr: 'Name',
          value: 'Name',
        }, {
          sr: 'GM Score',
          value: 'GM Score',
        }, {
          sr: 'Total cards graded over time',
        }, {
          sr: 'Actions',
        }]}
        tableData={data.map(({
          cards,
          difficulty,
          icon,
          id,
          name,
          popularity = 0,
          quality,
          score = 0,
          variant,
          year,
          total,
          history = [],
        }) => ({
          key: `set-${id}`,
          value: [{
            key: `set-${id}-name`,
            value: (
              <>
                <span className={classes.name}>
                  {icon
                    ? (
                      <>
                        <SetIcon filename={icon} set={name} />
                        {' '}
                      </>
                    ) : undefined}
                  <Link
                    to={paths.set(id, name)}
                  >
                    {'Pokemon '}
                    {name}
                    {variant ? ` (${variant})` : ''}
                  </Link>
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
                path={paths.set(id, name)}
                text="View"
              />
            ),
          }],
        }))}
      />
    );
  }

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
          },
        ]}
      />

      <h2>Sets</h2>

      {content}
    </>
  );
}

export default Sets;
