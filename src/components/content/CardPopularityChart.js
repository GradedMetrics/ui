import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
} from 'recharts';

function CardPopularityChart({
  data,
}) {
  const [formattedData, setFormattedData] = useState();

  /**
   * Convert card data in to a format that can be used with Recharts
   */
  useEffect(() => {
    const formatted = Object.entries(data).reduce((arr, [key, value]) => {
      const {
        grade = 0,
        half = 0,
        qualifier = 0,
      } = value;

      if (key === 'total') {
        return arr;
      }

      if (key === '1' || key === '1.5') {
        // Check if a formatted entry for PSA 1 already exists...
        const match = arr.find(({ name }) => name === '1');
        // Combine 1 and 1.5 data
        if (match) {
          match.grade += grade;
          match.half += half;
          match.qualifier += qualifier;
          return arr;
        }
      }

      let name;
      switch (key) {
        case '1.5':
          name = '1';
          break;

        case 'total':
          name = 'Total';
          break;

        case 'auth':
          name = 'Auth';
          break;

        default:
          name = key;
          break;
      }

      return [
        ...arr,
        {
          name, grade, half, qualifier,
        },
      ];
    }, []);

    setFormattedData(formatted);
  }, [data]);

  return (
    <BarChart
      width={700}
      height={500}
      data={formattedData}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >

      <XAxis dataKey="name" />
      {/* <XAxis dataKey="date" axisLine={false} tickLine={false} interval={0}
      tick={renderQuarterTick} height={1} scale="band" xAxisId="quarter" /> */}
      <YAxis />
      <Tooltip />

      <Bar dataKey="grade" fill="#009734" />
      <Bar dataKey="half" fill="#D97800" />
      <Bar dataKey="qualifier" fill="#C1BEBE" />
    </BarChart>
  );
}

const gradePropTypes = PropTypes.shape({
  grade: PropTypes.number,
  half: PropTypes.number,
  qualifier: PropTypes.number,
});

CardPopularityChart.propTypes = {
  data: PropTypes.shape(
    {
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
      total: gradePropTypes.isRequired,
    },
  ).isRequired,
};

export default CardPopularityChart;
