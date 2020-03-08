import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'contexts/theme';
import IconArrowLeft from 'assets/icons/arrow-left.svg';
import IconArrowRight from 'assets/icons/arrow-right.svg';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/content/Pagination';

const useStyles = createUseStyles(style);

function Pagination({
  callback = () => {},
  data = [],
  initialPage = 1,
  size = 20,
}) {
  const classes = useStyles(useContext(ThemeContext));
  const [page, setPage] = useState(Number(initialPage));
  const isFirstLoad = useRef(true);

  /**
   * This extracts a portion of the data and applies an `index` to the result.
   * @param {Number} start - The position in the array to start at.
   * @param {Number} end - The position in the array to stop at.
   */
  function getData(start = 0) {
    return data.slice(start, start + size).map((entry, index) => ({
      ...entry,
      index: index + start,
    }));
  }

  /** If the data changes after the first load, reset the page to 1.  */
  useEffect(() => {
    if (!data.length) {
      setPage(-1);
      return;
    }

    if (isFirstLoad.current) {
      setPage(Number(initialPage));
      isFirstLoad.current = false;
      return;
    }

    callback({
      data: getData(),
      page,
    });
    setPage(1);
  }, [data]);

  /**
   * When the page changes, determine the new data and send it back to the parent.
   */
  useEffect(() => {
    if (page === -1) {
      return;
    }

    const start = (page - 1) * size;

    if (start > data.length) {
      // If the page is greater than the number of pages available, reset to page 1.
      setPage(1);
      return;
    }

    // Scroll to the top of the page.
    window.scroll(0, 0);

    callback({
      data: getData(start),
      page,
    });
  }, [page]);

  if (!data.length) {
    return <></>;
  }

  // Create the array of page numbers based on the data length and the page size.
  const pages = new Array(Math.round(data.length / size)).fill(1).map((_, index) => index + 1);
  const lastPage = pages[pages.length - 1] || 1;

  return (
    <section className={classes.wrapper}>
      <nav className={classes.pagination}>
        <span className={classes.pageActions}>
          <button
            className={classes.button}
            onClick={() => setPage(1)}
            onKeyDown={(event) => event.which === 13 && setPage(1)}
            disabled={page === 1}
            type="button"
          >
            <IconArrowLeft />
            <IconArrowLeft />
          </button>
          <button
            className={classes.button}
            onClick={() => setPage(page - 1)}
            onKeyDown={(event) => event.which === 13 && setPage(page - 1)}
            disabled={page === 1}
            type="button"
          >
            <IconArrowLeft />
          </button>
        </span>
        <span className={classes.pageSelection}>
          Page
          {' '}
          {lastPage === 1 ? (
            <span>1</span>
          ) : (
            <select
              onChange={({ currentTarget }) => setPage(Number(currentTarget.value))}
              value={page}
            >
              {pages.map((number) => (
                <option
                  key={`page-${number}`}
                  value={number}
                >
                  {number}
                </option>
              ))}
            </select>
          )}
          {' '}
          of
          {' '}
          {lastPage}
        </span>
        <span className={classes.pageActions}>
          <button
            className={classes.button}
            onClick={() => setPage(page + 1)}
            onKeyDown={(event) => event.which === 13 && setPage(page + 1)}
            disabled={page === lastPage}
            type="button"
          >
            <IconArrowRight />
          </button>
          <button
            className={classes.button}
            onClick={() => setPage(lastPage)}
            onKeyDown={(event) => event.which === 13 && setPage(lastPage)}
            disabled={page === lastPage}
            type="button"
          >
            <IconArrowRight />
            <IconArrowRight />
          </button>
        </span>
      </nav>
    </section>
  );
}

Pagination.defaultProps = {
  data: undefined,
  size: 20,
};

Pagination.propTypes = {
  /** A callback function to pass the paginated data back to the parent. */
  callback: PropTypes.func.isRequired,

  /** The full dataset to apply pagination to. */
  data: PropTypes.array, // eslint-disable-line react/forbid-prop-types

  /** The page to start on. */
  initialPage: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,

  /** The page size. */
  size: PropTypes.number,
};

export default Pagination;
