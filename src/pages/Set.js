import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  Link, useHistory, useLocation, useParams,
} from 'react-router-dom';
import Breadcrumb from 'components/content/Breadcrumb';
import Chart from 'components/content/Chart';
import LinkButton from 'components/content/LinkButton';
import GenericTable from 'components/content/GenericTable';
import Pagination from 'components/content/Pagination';
import RankChange from 'components/content/RankChange';
import Sorter from 'components/content/Sorter';
import { ThemeContext } from 'contexts/theme';
import { formatObject, formatObjectArray } from 'js/keys';
import { apiGet } from 'js/api';
import { pathNames, paths, urlFriendlyName } from 'js/routes';
import { formatNumber, formatYear } from 'js/formats';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Set';

const useStyles = createUseStyles(style);

function Set() {
  const theme = useContext(ThemeContext);
  const classes = useStyles(theme);
  const history = useHistory();
  const location = useLocation();
  const { setId } = useParams();
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

    setSortedData();

    (async () => {
      const keys = await apiGet('keys');
      const set = await apiGet(`sets/${setId}`);
      const sets = await apiGet('sets');
      setData(formatObject(keys, {
        ...sets[setId],
        ...set,
      }));
      setParseHistory(formatObjectArray(keys, await apiGet('history')));
    })();
  }, [setId]);

  if (!data || !parseHistory) {
    return <p>Loading...</p>;
  }

  const {
    cards,
    difficulty: setDifficulty,
    name: setName,
    popularity: setPopularity,
    quality: setQuality,
    score: setScore = 0,
    variant: setVariant,
    year,
  } = data;

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
    history.push(paths.set(setId, urlFriendlyName(setName), q.toString()));
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
    history.push(paths.set(setId, urlFriendlyName(setName), q.toString()));
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
          sr: 'Number',
          value: '#',
        }, {
          value: 'Entry',
        }, {
          value: 'Score',
        }, {
          value: 'Cards graded over time',
        }, {
          sr: 'Actions',
        }]}
        tableData={paginatedData.map(({
          number,
          difficulty,
          history: cardHistory = [],
          id,
          name,
          popularity = 0,
          popularityChange = 0,
          psa10Grades = 0,
          psa10History: cardPSA10History = [],
          quality,
          score = 0,
          variants,
          total = 0,
        }) => {
          const chartData = [{
            date: parseHistory[parseHistory.length - 1].date,
            psa10Grades,
            total,
          }, ...(
            new Array(7).fill(1).map((_, index) => ({
              date: parseHistory[parseHistory.length - (2 + index)].date,
              psa10Grades: cardPSA10History[index],
              total: cardHistory[index],
            }))
          )].reverse();

          return {
            key: `card-${id}`,
            value: [{
              key: `card-${id}-popularity-rank-change`,
              value: <RankChange value={popularityChange} />,
            }, {
              key: `card-${id}-popularity-rank`,
              value: (
                <span>{popularity}</span>
              ),
            }, {
              key: `card-${id}-number`,
              value: (
                <span>{number}</span>
              ),
            }, {
              key: `card-${id}-name`,
              value: (
                <>
                  <span className={classes.name}>
                    <Link
                      to={paths.card(setId, id)}
                    >
                      {pathNames.card(name)}
                    </Link>
                  </span>
                  {variants ? <span className={classes.metrics}>{variants.join(', ')}</span> : ''}
                </>
              ),
            }, {
              key: `card-${id}-score`,
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
              key: `card-${id}-graph`,
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
                  data={chartData}
                />
              ),
            }, {
              key: `card-${id}-actions`,
              value: (
                <LinkButton
                  path={paths.card(setId, id)}
                  text="View"
                />
              ),
            }],
          };
        })}
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
          }, {
            text: data ? pathNames.set(setName, setVariant) : '...',
            path: '/set',
          },
        ]}
      />

      <h2 className={classes.setName}>
        {pathNames.set(setName, setVariant)}
      </h2>
      <p className={classes.setInfo}>
        {formatYear(year)}
        {' '}
        ·
        {' '}
        {cards.length}
        {' '}
        cards
      </p>

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

      {cards && cards.length ? (
        <Sorter
          callback={handleSorterChange}
          data={cards}
          defaultSortBy={initialSortBy.current}
          defaultSortOrder={initialSortOrder.current}
          fields={[{
            key: 'difficulty',
            text: 'Difficulty',
          }, {
            format: formatNumber,
            key: 'number',
            text: 'Number',
          }, {
            key: 'index',
            text: 'PSA Default',
          }, {
            key: 'popularity',
            isDefault: true,
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
          }]}
        />
      ) : undefined}

      {content}

      {sortedData && sortedData.length ? (
        <Pagination
          callback={handlePageChange}
          data={sortedData}
          initialPage={initialPage.current}
          size={50}
        />
      ) : undefined}
    </>
  );
}

export default Set;
