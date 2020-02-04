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
    value = ''
  }) => {
    return (
      <th key={sr}>
        <span className={classes.srOnly}>{sr}</span>
        {value}
      </th>
    );
  });
  const rowData = tableData.map((data, rowIndex) => {
    return (
      <tr key={`row-${rowIndex}`}>
        {data.map((entry, cellIndex) => (
          <td key={`cell-${cellIndex}`}>
            {entry}
          </td>
        ))}
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          {headers}
        </tr>
      </thead>
      <tbody>
          {rowData}
      </tbody>
    </table>
  );
}

GenericTable.propTypes = {
  tableHeaders: PropTypes.arrayOf(PropTypes.shape({
    sr: PropTypes.string.isRequired,
    value: PropTypes.string,
  })).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number,
    PropTypes.string,
  ]))).isRequired,
}

export default GenericTable;
