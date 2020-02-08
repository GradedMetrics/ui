import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/content/TypeAhead';

const useStyles = createUseStyles(style);

function TypeAhead({
  data = [],
}) {
  const classes = useStyles(useContext(ThemeContext));

  const [matches, setMatches] = useState([]);
  const [query, setQuery] = useState('');
  const inputTimer = useRef();

  function getMatches() {
    if (query.length < 3) {
      return [];
    }

    return data.reduce((arr, {
      entries,
      format,
      searchField,
      searchKey,
      sort,
      title,
    }) => [
      ...arr,
      {
        entries: [...entries.filter((entry) => {
          if (typeof entry === 'string') {
            // If it's a string, perform a string match.
            return entry.toLowerCase().indexOf(query.toLowerCase()) !== -1;
          }

          // If it's an object, perform a match on the primary field.
          return entry[searchField].toLowerCase().indexOf(query.toLowerCase()) !== -1;
        })].sort((a, b) => {
          if (typeof sort === 'function') {
            return sort(a, b);
          }

          let aSorter;
          let bSorter;

          if (typeof entry === 'string') {
            aSorter = a;
            bSorter = b;
          } else {
            aSorter = a[searchField];
            bSorter = b[searchField];
          }

          if (aSorter === bSorter) return 0;
          return aSorter > bSorter ? 1 : -1;
        }),
        format,
        searchField,
        searchKey,
        title,
      },
    ], []).filter(({ entries }) => entries.length);
  }

  /**
   * When the query changes we need to check to see if we want to perform the search.
   * If the query length is under 3 characters we don't want to do anything as it would return too
   * many results, but if it is 3 or more characters we want to kick off a timer which calls the
   * search function after we can be sure the user isn't in the middle of typing more characters.
   */
  useEffect(() => {
    window.clearTimeout(inputTimer.current);

    if (query.length < 3) {
      if (matches.length) {
        setMatches([]);
      }

      return;
    }

    inputTimer.current = window.setTimeout(() => {
      setMatches(getMatches());
    }, 300);
  }, [query]);

  return (
    <div className={classes.container}>
      <input
        className={classes.input}
        placeholder="Search"
        value={query}
        onChange={({ currentTarget }) => setQuery(currentTarget.value)}
      />
      {matches.length ? (
        <ul
          className={classes.dropdown}
          role="listbox"
        >
          {matches.map(({
            entries,
            format,
            searchKey,
            title,
          }) => (
            <li
              className={classes.category}
              key={`search-result-category-${title}`}
            >
              <strong className={classes.heading}>
                {title}
              </strong>
              <ul
                className={classes.results}
                role="listbox"
              >
                {entries.map((entry) => {
                  const key = searchKey ? entry[searchKey] : entry;

                  return (
                    <li
                      className={classes.result}
                      key={`search-result-entry-${key}`}
                    >
                      {typeof format === 'function' ? format(entry) : entry}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      ) : undefined}
    </div>
  );
}

TypeAhead.propTypes = {
  /** The data to search through. */
  data: PropTypes.arrayOf(PropTypes.shape({
    /** An array of strings or objects. If objects, there must be a `searchField`. */
    entries: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.string,
    ])).isRequired,

    /** A custom formatter for the search result. */
    format: PropTypes.func,

    /** If `entries` contains objects, this specifies which key to use for the search matching. */
    searchField: PropTypes.string,

    /** If `entries` contains objects, this specifies which key to use as the React key. */
    searchKey: PropTypes.string,

    /** A custom sorter for the search results. */
    sortSet: PropTypes.func,

    /** The title of the data subset. */
    title: PropTypes.string.isRequired,
  })).isRequired,
};

export default TypeAhead;
