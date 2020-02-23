import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Breadcrumb from 'components/content/Breadcrumb';
import Chart from 'components/content/Chart';
import GenericTable from 'components/content/GenericTable';
import LinkButton from 'components/content/LinkButton';
import Pagination from 'components/content/Pagination';
import Sorter from 'components/content/Sorter';
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
  const history = useHistory();
  const query = new URLSearchParams(useLocation().search);
  const initialPage = query.get('page') || 1;

  const [data, setData] = useState();
  const [paginatedData, setPaginatedData] = useState();
  const [sortedData, setSortedData] = useState();

  useEffect(() => {
    (async () => {
      const keys = await apiGet('keys');
      const sets = await apiGet('sets');
      setData(formatObjectArray(keys, Object.values(sets)));
    })();
  }, []);

  /**
   * Update the paginatedData state and page query string when the page changes.
   * @param {Object} - The pagination object which contains the paginated data and new page number.
   */
  function handlePageChange({
    data: paginated,
    page = 1,
  }) {
    history.push(paths.sets(page));
    setPaginatedData(paginated);
  }

  /**
   * Update the sortedData state and sort query string when the sorter changes.
   * @param {Object} - The sorter object which contains the sorted data and new sort order.
   */
  function handleSorterChange({
    data: sorted,
    sortBy = 1,
    sortOrder,
  }) {
    // history.push(paths.sets(page));
    setSortedData(sorted);
  }

  let content;

  if (!paginatedData) {
    content = <p>Loading...</p>;
  } else if (!paginatedData.length) {
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
        tableData={paginatedData.map(({
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
          history: setHistory = [],
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
                  ...setHistory,
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
            path: paths.sets(),
          },
        ]}
      />

      <h2>Sets</h2>

      {data && data.length ? (
        <Sorter
          callback={handleSorterChange}
          data={data}
          defaultSortBy="year"
          defaultSortOrder="asc"
          fields={[{
            key: 'cards',
            text: 'Cards',
          }, {
            key: 'difficulty',
            text: 'Difficulty',
          }, {
            key: 'popularity',
            text: 'Popularity',
          }, {
            key: 'quality',
            text: 'Quality',
          }, {
            key: 'year',
            format: formatYear,
            text: 'Year',
          }]}
        />
      ) : undefined}

      {content}

      {sortedData && sortedData.length ? (
        <Pagination
          callback={handlePageChange}
          data={sortedData}
          initialPage={initialPage}
        />
      ) : undefined}
    </>
  );
}

export default Sets;
