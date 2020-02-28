import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  Link, useHistory, useLocation,
} from 'react-router-dom';
import Breadcrumb from 'components/content/Breadcrumb';
import LinkButton from 'components/content/LinkButton';
import GenericTable from 'components/content/GenericTable';
import Pagination from 'components/content/Pagination';
import RankChange from 'components/content/RankChange';
import Sorter from 'components/content/Sorter';
import Tooltip from 'components/content/Tooltip';
import { ThemeContext } from 'contexts/theme';
import { formatObjectArray } from 'js/keys';
import { apiGet } from 'js/api';
import { pathNames, paths } from 'js/routes';
import { help } from 'js/text';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Set';

const useStyles = createUseStyles(style);

function Top100CardsByFewest10s() {
  const classes = useStyles(useContext(ThemeContext));
  const history = useHistory();
  const location = useLocation();
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
      const cards = await apiGet('cards-by-fewest-10s');
      setData(formatObjectArray(keys, cards));
    })();
  }, []);

  if (!data) {
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
    history.push(paths.top100CardsByFewest10s(q.toString()));
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
    history.push(paths.top100CardsByFewest10s(q.toString()));
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
          sr: 'Weekly rank position',
        }, {
          sr: 'Weekly rank position change',
        }, {
          value: 'Entry',
        }, {
          value: 'Set',
        }, {
          value: 'Score',
        }, {
          sr: 'Actions',
        }]}
        tableData={paginatedData.map(({
          number,
          id,
          name,
          psa10Grades = 0,
          rank = 0,
          rankChange = 0,
          score = 0,
          set = {},
          totalGrades = 0,
          variants,
        }) => {
          const {
            id: setId,
            name: setName,
            variant: setVariant,
            year: setYear,
          } = set;

          return {
            key: `set-${id}`,
            value: [{
              key: `card-${id}-rank-change`,
              value: <RankChange value={rankChange} />
            }, {
              key: `card-${id}-rank`,
              value: (
                <span>{rank}</span>
              )
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
                    {number ? ` #${number}` : undefined}
                  </span>
                  {(variants
                    ? <span className={classes.metrics}>{variants.join(', ')}</span>
                    : undefined
                  )}
                </>
              ),
            }, {
              key: `card-${id}-set`,
              value: (
                <>
                  <span className={classes.name}>
                    <Link to={paths.set(setId, setName)}>
                      {pathNames.set(setName, setVariant)}
                    </Link>
                    <span className={classes.metrics}>
                      {setYear}
                    </span>
                  </span>
                </>
              )
            }, {
              key: `set-${id}-score`,
              value: (
                <>
                  <span className={classes.score}>{score}</span>
                  <span className={classes.metrics}>{`PSA 10s: ${psa10Grades}.`}</span>
                  {' '}
                  <span className={classes.metrics}>{`Total: ${totalGrades}.`}</span>
                </>
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
            text: pathNames.top100CardsByFewest10s,
            path: paths.top100CardsByFewest10s(),
          }
        ]}
      />

      <h2 className={classes.setName}>
        Top 100 Cards by Fewest PSA 10 Grades
      </h2>

      <p>
        This is a list of the top 100 cards with the fewest PSA 10 grades compared to the total
        {' '}
        number of times the card has been graded.
      </p>

      <p>
        Score on this page is a value between 0 and 10 which is calculated from the number of PSA 10
        {' '}
        grades a card has received compared against the total number of grades the card has
        {' '}
        received.
      </p>

      <p>
        Unlike the
        {' '}
        <Link to={paths.top100CardsByScore}>
          {pathNames.top100CardsByScore}
        </Link>
        {' '}
        list, card popularity plays a big part in why some cards are featured here. In some cases
        {' '}
        cards featured here will not necessarily be
        {' '}
        <em>difficult</em>
        {' '}
        to grade, but rather they are just so popular that it isn&#39;t only the mint condition
        {' '}
        cards being pushed through PSA&#39;s system.
      </p>

      {data && data.length ? (
        <Sorter
          callback={handleSorterChange}
          data={data}
          defaultSortBy={initialSortBy.current}
          defaultSortOrder={initialSortOrder.current}
          fields={[{
            key: 'psa10Grades',
            text: 'PSA 10 Grades',
          }, {
            isDefault: true,
            key: 'rank',
            text: 'Rank',
          }, {
            key: 'rankChange',
            text: 'Rank change',
          }, {
            key: 'totalGrades',
            text: 'Total Grades',
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

export default Top100CardsByFewest10s;
