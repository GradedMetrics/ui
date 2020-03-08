import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
} from 'recharts';

function GradeCategoryAxis({
  index,
  payload = {},
  x,
  y,
  ...rest
}) {
  const { offset } = payload;
  console.warn(payload);

  if (index === 0) {
    // Auth.
    return (
      <text
        x={x + offset}
        y={y + 10}
        textAnchor="middle"
        id="foobar"
      >
        Auth
      </text>
    );
  }
}

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

        case '9':
          return [
            ...arr,
            {
              name: '9',
              grade,
              qualifier,
            },
          ];

        case '10':
          return [
            ...arr,
            {
              name: '10',
              grade,
            },
          ];

        case 'auth':
          return [
            ...arr,
            {
              name: 'Auth',
              grade,
            },
          ];

        default:
          name = key;
          break;
      }

      return [
        ...arr,
        {
          name,
          grade,
          half,
          qualifier,
        },
      ];
    }, []);

    setFormattedData([...formatted].sort((a, b) => {
      if (a.name === 'Auth') {
        return -1;
      }

      if (b.name === 'Auth') {
        return 1;
      }

      return a < b ? -1 : 1;
    }));
  }, [data]);

  console.log(formattedData);

  return (
    <BarChart
      width={700}
      height={500}
      data={formattedData}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <XAxis dataKey="name" type="category" />
      <XAxis
        dataKey="name"
        axisLine={false}
        tickLine={false}
        interval={0}
        tick={GradeCategoryAxis}
        height={1}
        scale="band"
        xAxisId="quarter"
      />
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
