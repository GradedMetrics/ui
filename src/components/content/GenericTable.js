import React, { useContext } from 'react';
import { ThemeContext } from 'contexts/theme';
import PropTypes from 'prop-types';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Header';

const useStyles = createUseStyles(style);

function GenericTable({
  tableHeaders, tableData,
}) {
  const classes = useStyles(useContext(ThemeContext));

  const headers = tableHeaders.map(({
    sr,
    value = '',
  }) => (
    <th key={sr}>
      <span className={classes.srOnly}>{sr}</span>
      {value}
    </th>
  ));
  const row = tableData.map(({ key: rowKey, value: rowData }) => (
    <tr key={`row-${rowKey}`}>
      {rowData.map(({ key: cellKey, value: cellData }) => (
        <td key={`cell-${cellKey}`}>
          {cellData}
        </td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>
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
  tableData: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.number,
        PropTypes.string,
      ]),
    })),
  })).isRequired,
};

export default GenericTable;
