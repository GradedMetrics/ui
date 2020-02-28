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
import Sorter from 'components/content/Sorter';
import { ThemeContext } from 'contexts/theme';
import { formatObject } from 'js/keys';
import { apiGet } from 'js/api';
import { pathNames, paths, urlFriendlyName } from 'js/routes';
import { formatYear } from 'js/formats';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Set';

const useStyles = createUseStyles(style);

function Set() {
  const classes = useStyles(useContext(ThemeContext));
  const history = useHistory();
  const location = useLocation();
  const { setId } = useParams();
  const initialPage = useRef();
  const initialSortBy = useRef();
  const initialSortOrder = useRef();

  const [data, setData] = useState();
  const [paginatedData, setPaginatedData] = useState();
  const [sortedData, setSortedData] = useState();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    initialPage.current = query.get('page') || 1;
    initialSortBy.current = query.get('sort') || 'number';
    initialSortOrder.current = query.get('order') || 'asc';

    setSortedData();

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
    variant: setVariant,
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
          sr: 'Number',
          value: '#',
        }, {
          value: 'Entry',
        }, {
          value: 'Score',
        }, {
          value: 'Total cards graded over time',
        }, {
          sr: 'Actions',
        }]}
        tableData={paginatedData.map(({
          number,
          difficulty,
          id,
          name,
          popularity = 0,
          quality,
          score = 0,
          variants,
          total,
          history: cardHistory = [],
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
                    {pathNames.card(name)}
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
                  ...cardHistory,
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
            key: 'number',
            text: 'Number',
          }, {
            isDefault: true,
            key: 'index',
            text: 'PSA Default',
          }, {
            key: 'quality',
            text: 'Quality',
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
