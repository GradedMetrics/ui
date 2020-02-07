import React, { useContext } from 'react';
import { ThemeContext } from 'contexts/theme';
import PropTypes from 'prop-types';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/content/GenericTable';

const useStyles = createUseStyles(style);

function GenericTable({
  tableHeaders, tableData,
}) {
  const classes = useStyles(useContext(ThemeContext));

  const headers = tableHeaders.map(({
    sr,
    value = '',
  }) => (
    <th key={sr} aria-label={sr} className={classes.cells}>
      <span aria-hidden="true">{value}</span>
    </th>
  ));
  const row = tableData.map(({ key: rowKey, value: rowData }) => (
    <tr key={`row-${rowKey}`} className={classes.rowSeparator}>
      {rowData.map(({ key: cellKey, value: cellData }) => (
        <td key={`cell-${cellKey}`} className={classes.cells}>
          {cellData}
        </td>
      ))}
    </tr>
  ));

  return (
    <table className={classes.table}>
      <thead>
        <tr className={classes.header}>
          {headers}
        </tr>
      </thead>
      <tbody>
        {row}
      </tbody>
    </table>
  );
}

GenericTable.propTypes = {
  tableHeaders: PropTypes.arrayOf(PropTypes.shape({
    sr: PropTypes.string.isRequired,
    value: PropTypes.string,
  })).isRequired,

  /** This is the table data which is an array of rows. */
  tableData: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,

    /** This is the row data which is an array of cells. */
    value: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,

      /** This is the cell data. */
      value: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.number,
        PropTypes.string,
      ]),
    })),
  })).isRequired,
};

export default GenericTable;
