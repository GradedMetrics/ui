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
  containerClassName,
  data = [],
  dropdownClassName,
  inputClassName,
  placeholder = 'Search',
}) {
  const classes = useStyles(useContext(ThemeContext));

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [matches, setMatches] = useState([]);
  const [query, setQuery] = useState('');
  const inputTimer = useRef();
  const containerElem = useRef();
  const dropdownElem = useRef();
  const inputElem = useRef();

  function getMatches() {
    if (query.length < 3) {
      return [];
    }

    return data.reduce((arr, {
      entries,
      format,
      handleSelect,
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
        handleSelect,
        searchField,
        searchKey,
        title,
      },
    ], []).filter(({ entries }) => entries.length);
  }

  /**
   * If the user clicks anywhere on the document and the dropdown is visible, we need to determine
   * whether we need to close the dropdown. If the user clicks outside of the TypeAhead element,
   * the dropdown should be closed.
   * @param {Event} - The DOM event.
   */
  function handleDocumentClick({ target }) {
    if ((
      !isDropdownVisible
      || containerElem.current.contains(target)
    )) {
      return;
    }

    setDropdownVisible(false);
  }

  /**
   * When the isDropdownVisible state changes, apply or remove an event listener to hide the
   * dropdown if the user clicks away.
   */
  useEffect(() => {
    if (!dropdownElem.current) {
      // The dropdown element is no longer visible, remove the event listener.
      document.removeEventListener('click', handleDocumentClick);
      return;
    }

    if (isDropdownVisible) {
      // The dropdown is visible, add the event listener.
      document.addEventListener('click', handleDocumentClick, true);
      return;
    }

    // The dropdown is not visible, remove the event listener.
    document.removeEventListener('click', handleDocumentClick);
  }, [dropdownElem.current, isDropdownVisible]);

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
        setDropdownVisible(false);
        setMatches([]);
      }

      return;
    }

    inputTimer.current = window.setTimeout(() => {
      const newMatches = getMatches();
      setMatches(newMatches);

      if (newMatches.length) {
        setDropdownVisible(true);
      } else {
        setDropdownVisible(false);
      }
    }, 300);
  }, [query]);

  /**
   * When the input field is focussed we may need to show the dropdown if the user has already made
   * a search but closed the dropdown.
   */
  function handleInputFocus() {
    if (isDropdownVisible) {
      // The dropdown is already visible, do nothing.
      return;
    }

    if (!matches.length) {
      // There are no matches.
      return;
    }

    setDropdownVisible(true);
  }

  /**
   * When the user selects a result, pass the result through to the parent and reset the TypeAhead
   * to its original state.
   * @param {Object} result - The selected result object.
   * @param {Function} callbackFn - The callback function to call.
   */
  function handleResultClick(result, callbackFn) {
    setDropdownVisible(false);
    setQuery('');
    setMatches([]);
    callbackFn(result);
  }

  /**
   * Allow keyboard navigation through the results using the up and down keyboard keys.
   * We can't destructure the `event` argument as we're calling `event.preventDefault` and for some
   * reason if that gets destructured it causes a TypeError.
   * @param {Event} - The DOM event.
   */
  function handleNavigate(event) {
    const { which } = event;

    if ((which !== 38 && which !== 40) || !isDropdownVisible) {
      return;
    }

    const { currentTarget } = event;

    if (which === 38) {
      // The up arrow was pressed.
      if (currentTarget === inputElem.current) {
        // The input field is already focussed. Do nothing.
        return;
      }

      /**
       * PreventDefault is called here for 2 reasons:
       * 1. If we're going back to the input field, this ensures the text cursor position does not
       *    get set back to the beginning of the text.
       * 2. If we're going up the results list, this ensures the scroll position does not jump
       *    around.
       */
      event.preventDefault();

      const resultListElem = currentTarget.parentNode;
      if (resultListElem.parentNode.querySelector('li:first-child') === resultListElem) {
        // The first result in one of the sets of results is focussed...

        const setListElem = currentTarget.closest('ul').parentNode;
        if (setListElem.parentNode.querySelector('li:first-child > ul').parentNode === setListElem) {
          // The first button is focussed. Select the input field.
          inputElem.current.focus();
          inputElem.current.setSelectionRange(query.length, query.length);
          return;
        }

        // Move back to the previous result list's last result.
        resultListElem.parentNode.parentNode.previousElementSibling.querySelector('li:last-child').querySelector('button').focus();
        return;
      }

      // Select the previous result.
      resultListElem.previousElementSibling.querySelector('button').focus();
      return;
    }

    // The down arrow was pressed...

    // Ensure the scroll position of the list does not jump around.
    event.preventDefault();

    if (currentTarget === inputElem.current) {
      // The input field is focussed. Select the first result.
      containerElem.current.querySelector('button').focus();
      return;
    }

    const resultListElem = currentTarget.parentNode;
    if (resultListElem.parentNode.querySelector('li:last-child') === resultListElem) {
      // The last result in one of the sets of results is focussed...

      const setListElem = currentTarget.closest('ul').parentNode;
      if (setListElem.parentNode.querySelector('li:last-child > ul').parentNode === setListElem) {
        // We're already on the last list. Do nothing.
        return;
      }

      // Move on to the next result list's first result.
      resultListElem.parentNode.parentNode.nextElementSibling.querySelector('button').focus();
      return;
    }

    // Select the next result.
    resultListElem.nextElementSibling.querySelector('button').focus();
  }

  return (
    <div
      className={`${classes.container}${containerClassName ? ` ${containerClassName}` : ''}`}
      ref={containerElem}
    >
      <input
        className={`${classes.input}${inputClassName ? ` ${inputClassName}` : ''}`}
        placeholder={placeholder}
        ref={inputElem}
        value={query}
        onChange={({ currentTarget }) => setQuery(currentTarget.value)}
        onKeyDown={handleNavigate}
        onFocus={handleInputFocus}
      />
      {isDropdownVisible ? (
        <ul
          className={`${classes.dropdown}${dropdownClassName ? ` ${dropdownClassName}` : ''}`}
          ref={dropdownElem}
          role="listbox"
        >
          {matches.map(({
            entries,
            format,
            handleSelect,
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
                      <button
                        className={classes.resultButton}
                        type="button"
                        onClick={() => handleResultClick(entry, handleSelect)}
                        onKeyDown={(event) => {
                          if (event.which === 13) {
                            // The return key was pressed.
                            handleResultClick(entry, handleSelect);
                            return;
                          }

                          handleNavigate(event);
                        }}
                      >
                        {typeof format === 'function' ? format(entry) : entry}
                      </button>
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

TypeAhead.defaultProps = {
  containerClassName: undefined,
  dropdownClassName: undefined,
  inputClassName: undefined,
  placeholder: 'Search',
};

TypeAhead.propTypes = {
  /** A custom class name to apply to the container. */
  containerClassName: PropTypes.string,

  /** The data to search through. */
  data: PropTypes.arrayOf(PropTypes.shape({
    /** An array of strings or objects. If objects, there must be a `searchField`. */
    entries: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.shape({}),
      PropTypes.string,
    ])).isRequired,

    /** A custom formatter for the search result. */
    format: PropTypes.func,

    /** A callback which is called when an item is selected. */
    handleSelect: PropTypes.func.isRequired,

    /** If `entries` contains objects, this specifies which key to use for the search matching. */
    searchField: PropTypes.string,

    /** If `entries` contains objects, this specifies which key to use as the React key. */
    searchKey: PropTypes.string,

    /** A custom sorter for the search results. */
    sortSet: PropTypes.func,

    /** The title of the data subset. */
    title: PropTypes.string.isRequired,
  })).isRequired,

  /** A custom class name to apply to the dropdown. */
  dropdownClassName: PropTypes.string,

  /** A custom class name to apply to the input field. */
  inputClassName: PropTypes.string,

  /** A placeholder value to show in the input field. */
  placeholder: PropTypes.string,
};

export default TypeAhead;
