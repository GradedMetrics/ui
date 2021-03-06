import React, {
  useContext, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSortAmountDownAlt,
} from '@fortawesome/pro-solid-svg-icons';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/content/Sorter';

const useStyles = createUseStyles(style);

function Sorter({
  callback = () => {},
  data = [],
  defaultSortBy,
  defaultSortOrder = 'asc',
  fields = [],
}) {
  if (!Array.isArray(fields) || fields.length === 0) {
    throw new Error('<Sorter /> expects to receive an array of fields to sort on.');
  }

  const classes = useStyles(useContext(ThemeContext));
  const [sortBy, setSortBy] = useState(defaultSortBy || fields[0].key);
  const [sortOrder, setSortOrder] = useState(defaultSortOrder || 'asc');

  /**
   * When the selection changes, determine the new data and send it back to the parent.
   */
  useEffect(() => {
    const fieldMatch = fields.find(({ key }) => key === sortBy);

    if (!fieldMatch) {
      // If no field is matched by the sort order, revert to using the field with `isDefault`.
      let defaultField = fields.find(({ isDefault }) => isDefault);

      if (!defaultField) {
        // If there is no field with `isDefault`, revert to the first field in the array.
        [defaultField] = fields;
      }

      setSortBy(defaultField.key);
      return;
    }

    let sortedData;

    if (sortBy === 'index') {
      // If the sort key is `'index'` return the original array.
      sortedData = sortOrder === 'asc' ? data : [...data].reverse();
    } else {
      // Sort the data by the specified key.
      const {
        format = (value) => value,
      } = fields.find(({ key }) => key === sortBy);

      sortedData = [...data].sort((a, b) => {
        const aValue = format(a[sortBy]);
        const bValue = format(b[sortBy]);

        if (aValue === bValue) {
          return 0;
        }

        const direction = sortOrder === 'asc' ? -1 : 1;
        return aValue < bValue ? direction : -direction;
      });
    }

    callback({
      data: sortedData,
      sortBy,
      sortOrder,
    });
  }, [data, sortBy, sortOrder]);

  return (
    <section className={classes.wrapper}>
      <div className={classes.sorter}>
        <span className={classes.inner}>
          <FontAwesomeIcon
            className={classes.icon}
            icon={faSortAmountDownAlt}
          />
          {' '}
          Sort by
          {' '}
          <select
            onChange={({ currentTarget }) => setSortBy(currentTarget.value)}
            value={sortBy}
          >
            {fields.map(({ key, text }) => (
              <option
                key={`sort-by-${key}`}
                value={key}
              >
                {text}
              </option>
            ))}
          </select>
          {' '}
          in
          {' '}
          <select
            onChange={({ currentTarget }) => setSortOrder(currentTarget.value)}
            value={sortOrder}
          >
            <option value="asc">
              Ascending
            </option>
            <option value="desc">
              Descending
            </option>
          </select>
          {' '}
          order
        </span>
      </div>
    </section>
  );
}

Sorter.defaultProps = {
  defaultSortBy: undefined,
  defaultSortOrder: 'asc',
};

Sorter.propTypes = {
  /** A callback function to pass the sorted data back to the parent. */
  callback: PropTypes.func.isRequired,

  /** The full dataset to apply sorter to. */
  data: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types

  /** Default sort by key. */
  defaultSortBy: PropTypes.string,

  /** Default sort order. */
  defaultSortOrder: PropTypes.string,

  /** The sortable fields. These must match fields available within the data set. */
  fields: PropTypes.arrayOf(PropTypes.shape({
    /** A custom format function applied before the value is sorted. */
    format: PropTypes.func,

    /** The default key to use if the URL is malformatted (i.e. the sort value is invalid). */
    isDefault: PropTypes.bool,

    /** The field key to sort by. */
    key: PropTypes.string.isRequired,

    /** What the sorter should display for that field. */
    text: PropTypes.string.isRequired,
  })).isRequired,
};

export default Sorter;
