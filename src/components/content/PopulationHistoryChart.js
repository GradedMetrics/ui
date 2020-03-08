import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ThemeContext } from 'contexts/theme';
import { formatDate } from 'js/formats';
import {
  combineGradeObjects,
  flattenGradesObject,
  getBlankGradesObject,
} from 'js/grades';

function PopulationHistoryChart({
  history,
}) {
  const {
    chartColours,
    chartPSAGrades,
  } = useContext(ThemeContext);
  const [data, setData] = useState();

  useEffect(() => {
    const [latest, ...rest] = history;

    const latestGrades = combineGradeObjects(getBlankGradesObject(), latest.grades);

    setData([{
      date: latest.date,
      ...flattenGradesObject(latestGrades),
    }, ...rest.map(({ date, grades }) => ({
      date,
      ...flattenGradesObject(combineGradeObjects(latestGrades, grades)),
    }))].reverse());
  }, [history]);

  if (!data) {
    return <p>Loading...</p>;
  }

  /**
   * Format a grade key to make it human-readable.
   * @param {String} key - A grade key (Like '1.5', '7Q' or 'auth').
   */
  function formatGradeKey(key) {
    if (key === 'auth') {
      return 'Authentic';
    }

    if (Number.isNaN(Number(key))) {
      // Qualifier grades.
      return `PSA ${key.substr(0, 1)}(Q)`;
    }

    return `PSA ${key}`;
  }

  /**
   * Apply a sort value to a grade key to allow the keys to be sorted in a logical order.
   * This places 'auth' at the top, followed by grades 1 through 10 with qualifier grades before
   * half grades.
   * @param {String} key - A grade key (Like '1.5', '7Q' or 'auth').
   */
  function getGradeKeySortValue(key) {
    if (key === 'auth') {
      // Auth is the first to display.
      return 0;
    }

    if (!Number.isNaN(Number(key))) {
      // The key is either a raw number (8) or a half grade (8.5).
      return Number(key);
    }

    // It's a qualifier grade. Lower than full grade, but higher than half grade.
    return Number(`${key.substr(0, 1)}.1`);
  }

  /**
   * Extract only the relevant grades and sort them.
   * This only includes entries with at least one graded card.
   */
  const dataKeys = Object.keys(data[0]).filter((gradeKey) => {
    switch (gradeKey) {
      case 'date':
      case 'total':
      case 'totalHalf':
      case 'totalQualifier':
        return false;

      default:
        break;
    }

    return data.find((entry) => entry[gradeKey] > 0);
  }).sort((a, b) => {
    const aValue = getGradeKeySortValue(a);
    const bValue = getGradeKeySortValue(b);

    if (aValue === bValue) {
      return 0;
    }

    return aValue > bValue ? 1 : -1;
  });

  return (
    <LineChart
      width={740}
      height={500}
      data={data}
    >
      <CartesianGrid
        strokeDasharray="1 1"
      />
      <Tooltip />
      <XAxis
        angle={90}
        dataKey="date"
        interval={0}
        label="Date"
        textAnchor="start"
        tickFormatter={(date) => formatDate(new Date(date))}
      />
      <YAxis
        interval="preserveStartEnd"
        type="number"
        domain={[0, (dataMax) => Math.round(dataMax * 1.1)]}
      />
      <Legend />
      {dataKeys.map((gradeKey) => (
        <Line
          key={`line-${gradeKey}`}
          animationDuration={500}
          type="monotone"
          dataKey={gradeKey}
          name={formatGradeKey(gradeKey)}
          stroke={chartPSAGrades[gradeKey]}
          strokeWidth={2}
          // yAxisId={key}
        />
      ))}
    </LineChart>
  );
}

const gradePropTypes = PropTypes.shape({
  grade: PropTypes.number,
  half: PropTypes.number,
  qualifier: PropTypes.number,
});

PopulationHistoryChart.propTypes = {
  history: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.number.isRequired,
    grades: PropTypes.shape({
      1: gradePropTypes,
      1.5: gradePropTypes,
      2: gradePropTypes,
      3: gradePropTypes,
      4: gradePropTypes,
      5: gradePropTypes,
      6: gradePropTypes,
      7: gradePropTypes,
      8: gradePropTypes,
      9: gradePropTypes,
      10: gradePropTypes,
      auth: gradePropTypes,
      total: gradePropTypes,
    }).isRequired,
  })).isRequired,
};

export default PopulationHistoryChart;
