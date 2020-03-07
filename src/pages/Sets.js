import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Breadcrumb from 'components/content/Breadcrumb';
import Chart from 'components/content/Chart';
import GenericTable from 'components/content/GenericTable';
import LinkButton from 'components/content/LinkButton';
import Pagination from 'components/content/Pagination';
import RankChange from 'components/content/RankChange';
import Sorter from 'components/content/Sorter';
import SetIcon from 'components/content/SetIcon';
import Tooltip from 'components/content/Tooltip';
import { ThemeContext } from 'contexts/theme';
import { formatYear } from 'js/formats';
import { formatObjectArray } from 'js/keys';
import { apiGet } from 'js/api';
import { pathNames, paths } from 'js/routes';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Sets';

const useStyles = createUseStyles(style);

function Sets() {
  const theme = useContext(ThemeContext);
  const classes = useStyles(theme);
  const history = useHistory();
  const location = useLocation();
  const initialPage = useRef();
  const initialSortBy = useRef();
  const initialSortOrder = useRef();

  const [data, setData] = useState();
  const [paginatedData, setPaginatedData] = useState();
  const [parseHistory, setParseHistory] = useState();
  const [sortedData, setSortedData] = useState();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    initialPage.current = query.get('page') || 1;
    initialSortBy.current = query.get('sort') || 'popularity';
    initialSortOrder.current = query.get('order') || 'asc';

    (async () => {
      const keys = await apiGet('keys');
      const sets = await apiGet('sets');
      setData(formatObjectArray(keys, Object.values(sets)));
      setParseHistory(formatObjectArray(keys, await apiGet('history')));
    })();
  }, []);

  if (!data || !parseHistory) {
    return <p>Loading...</p>;
  }

  /**
   * Update the paginatedData state and page query string when the page changes.
   * @param {Object} - The pagination object which contains the paginated data and new page number.
   */
  function handlePageChange({
    data: paginated,
    page = 1,
  }) {
    const q = new URLSearchParams(location.search);
    q.set('page', page);
    history.push(paths.sets(q.toString()));
    setPaginatedData(paginated);
  }

  /**
   * Update the sortedData state and sort query string when the sorter changes.
   * @param {Object} - The sorter object which contains the sorted data and new sort order.
   */
  function handleSorterChange({
    data: sorted,
    sortBy,
    sortOrder,
  }) {
    const q = new URLSearchParams(location.search);
    q.set('page', 1);
    q.set('sort', sortBy);
    q.set('order', sortOrder);
    history.push(paths.sets(q.toString()));
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
          colSpan: 2,
          value: 'Popularity',
        }, {
          sr: 'Name',
          value: 'Name',
        }, {
          sr: 'Score',
          value: (
            <>
              Score
              {' '}
              <Tooltip
                id="tooltip-sets-score"
                position="bottom"
                text={(
                  <>
                    <div>
                      <strong>Score</strong>
                      {' '}
                      is a number between 0 (lowest) and 10 (highest) which determines how
                      {' '}
                      difficult it is for PSA 10s to be graded.
                    </div>
                    <div>
                      <strong>Quality</strong>
                      {' '}
                      is a percentage of cards which have not received a qualifier grade
                      {' '}
                      (like MC &mdash; miscut).
                    </div>
                    <div>
                      <strong>Difficulty</strong>
                      {' '}
                      is a percentage comparing PSA 8.5 and 9 grades against PSA 10 grades. The
                      {' '}
                      closer this is to 100, the scarcer PSA 10 grades are.
                    </div>
                  </>
                )}
              />
            </>
          ),
        }, {
          value: (
            <>
              Cards graded over time
              {' '}
              <Tooltip
                id="tooltip-sets-total"
                position="bottom"
                text="This shows how many cards have been graded per week. This is updated every Wednesday."
              />
            </>
          ),
        }, {
          sr: 'Actions',
        }]}
        tableData={paginatedData.map(({
          cards,
          difficulty,
          difficultySampleSize = 0,
          icon,
          id,
          name,
          popularity = 0,
          popularityChange = 0,
          psa10Grades = 0,
          psa10History,
          quality,
          score = 0,
          variant,
          year,
          total,
          history: setHistory = [],
        }) => ({
          key: `set-${id}`,
          value: [{
            key: `set-${id}-popularity-rank-change`,
            value: <RankChange value={popularityChange} />,
          }, {
            key: `set-${id}-popularity-rank`,
            value: (
              <span>{popularity}</span>
            ),
          }, {
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
                    {pathNames.set(name, variant)}
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
              </>
            ),
          }, {
            key: `set-${id}-graph`,
            value: (
              <Chart
                axes={[{
                  color: theme.chartColours.psa10,
                  key: 'psa10Grades',
                  label: 'PSA 10 population',
                  type: 'bar',
                }, {
                  color: theme.chartColours.total,
                  key: 'total',
                  label: 'Total graded',
                }]}
                data={[{
                  date: parseHistory[parseHistory.length - 1].date,
                  psa10Grades,
                  total,
                }, ...setHistory.map((entry, index) => ({
                  date: parseHistory[parseHistory.length - (2 + index)].date,
                  psa10Grades: psa10History[index],
                  total: entry,
                }))].reverse()}
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
            text: pathNames.home,
            path: paths.home,
          }, {
            text: pathNames.sets,
            path: paths.sets(),
          },
        ]}
      />

      <h2>Sets</h2>

      {data && data.length ? (
        <Sorter
          callback={handleSorterChange}
          data={data}
          defaultSortBy={initialSortBy.current}
          defaultSortOrder={initialSortOrder.current}
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
            key: 'popularityChange',
            text: 'Rank change',
          }, {
            key: 'score',
            text: 'Score',
          }, {
            key: 'year',
            format: formatYear,
            isDefault: true,
            text: 'Year',
          }]}
        />
      ) : undefined}

      {content}

      {sortedData && sortedData.length ? (
        <Pagination
          callback={handlePageChange}
          data={sortedData}
          initialPage={initialPage.current}
        />
      ) : undefined}
    </>
  );
}

export default Sets;
