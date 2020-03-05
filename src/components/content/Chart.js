import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  Bar, CartesianGrid, LabelList, ComposedChart, Line, Tooltip, YAxis,
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
  value = 0,
  x,
  y,
}, data, axisKey) {
  const classes = useStyles(useContext(ThemeContext));

  if (index > 0 && index < data.length - 1) {
    return <></>;
  }

  let className;
  let textAnchor;
  let xOffset;
  let yOffset;

  if (axisKey === 'total') {
    className = classes.total;
    textAnchor = index === 0 ? 'end' : 'start';
    xOffset = index === 0 ? x - 24 : x + 24;
    yOffset = y;
  } else if (axisKey === 'psa10Grades') {
    className = classes.psa10;
    textAnchor = 'middle';
    xOffset = x + 15;
    yOffset = index === 0 ? 45 : -4;
  } else {
    return undefined;
  }


  return (
    <g>
      <text
        className={`${classes.label} ${className}`}
        dominantBaseline="middle"
        x={xOffset}
        y={yOffset}
        textAnchor={textAnchor}
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

function Chart({
  axes = [],
  axesLabels = [],
  data,
}) {
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

  return (
    <div className={classes.wrapper}>
      <ComposedChart
        className={classes.chart}
        width={chartWidth}
        height={40}
        data={data}
      >
        <CartesianGrid
          strokeDasharray="1 1"
        />
        <Tooltip
          content={(props) => RechartsTooltip(props, axes)}
          cursor={false}
        />
        {axes.map(({ key, type }) => {
          let domain = ['dataMin', 'dataMax'];

          if (type === 'bar') {
            domain = ['dataMin - 5', 'dataMax + 5'];
          }

          return (
            <YAxis
              key={`yaxis-${key}`}
              yAxisId={key}
              type="number"
              hide
              domain={domain}
            />
          );
        })}
        {axes.map(({ color, key, type }) => {
          if (type === 'bar') {
            return (
              <Bar
                key={`line-${key}`}
                animationDuration={500}
                barSize={30}
                dataKey={key}
                fill={color}
                yAxisId={key}
              >
                <LabelList
                  content={(props) => ChartAxisLabel(props, data, key)}
                  dataKey={key}
                />
              </Bar>
            );
          }

          return (
            <Line
              key={`line-${key}`}
              animationDuration={500}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2}
              yAxisId={key}
            >
              <LabelList
                content={(props) => ChartAxisLabel(props, data, key)}
                dataKey={key}
              />
            </Line>
          );
        })}
      </ComposedChart>
    </div>
  );
}

Chart.propTypes = {
  /** An array of axes. */
  axes: PropTypes.arrayOf(PropTypes.shape({
    /** The data key this axis relates to. */
    key: PropTypes.string.isRequired,
    /** A label for the axis. */
    label: PropTypes.string.isRequired,
  })).isRequired,

  /** The data array. */
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.number)).isRequired,
};

export default Chart;
