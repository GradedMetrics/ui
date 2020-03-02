import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  CartesianGrid, LabelList, LineChart, Line, Tooltip, YAxis,
} from 'recharts';
import PropTypes from 'prop-types';
import RechartsTooltip from 'components/vendor/RechartsTooltip';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/content/Chart';

const useStyles = createUseStyles(style);

function ChartAxisLabel({
  index,
  value,
  x,
  y,
}, data) {
  const classes = useStyles(useContext(ThemeContext));

  if (index > 0 && index < data.length - 1) {
    return <></>;
  }

  const xOffset = index === 0 ? x - 12 : x + 12;

  return (
    <g>
      <text
        className={classes.label}
        dominantBaseline="middle"
        x={xOffset}
        y={y}
        textAnchor={index === 0 ? 'end' : 'start'}
      >
        {value.toLocaleString()}
      </text>
    </g>
  );
}

ChartAxisLabel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

function Chart({ data }) {
  const classes = useStyles(useContext(ThemeContext));
  const elem = useRef();
  const timer = useRef();
  const [isReady, setReady] = useState(false);
  const chartWidth = 300;

  /**
   * Delay function for the rendering of the charts.  Adds a span element to the page and checks
   * if it is visible on the screen.  If the span element is visible the chart will render.
   */
  useEffect(() => {
    if (!elem.current) { return; }

    timer.current = window.setInterval(() => {
      if (!elem.current) {
        window.clearInterval(timer.current);
        return;
      }

      const { bottom, top } = elem.current.getBoundingClientRect();
      const isVisible = top >= 0 && bottom <= window.innerHeight;

      if (!isVisible) { return; }

      window.clearInterval(timer.current);

      setReady(true);
    }, 100);
  }, [elem.current]);

  /**
   * Cleanup timer when component unmounts
   */
  useEffect(() => () => window.clearInterval(timer.current), []);

  if (!isReady) {
    return (
      <div className={classes.wrapper}>
        <span
          style={{
            display: 'block',
            width: `${chartWidth}px`,
          }}
          ref={elem}
        />
      </div>
    );
  }

  const mappedData = data.map((entry) => ({
    name: 'Total',
    total: entry,
  }));

  return (
    <div className={classes.wrapper}>
      <LineChart
        className={classes.chart}
        width={chartWidth}
        height={40}
        data={mappedData}
      >
        <CartesianGrid
          strokeDasharray="1 1"
        />
        <YAxis type="number" hide domain={['dataMin', 'dataMax']} />
        <Tooltip cursor={false} content={RechartsTooltip} />
        <Line
          animationDuration={500}
          type="monotone"
          dataKey="total"
          stroke="#D97800"
          strokeWidth={2}
        >
          <LabelList dataKey="total" content={(props) => ChartAxisLabel(props, mappedData)} />
        </Line>
      </LineChart>
    </div>
  );
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Chart;
