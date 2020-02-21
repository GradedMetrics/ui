import React, { useEffect, useRef, useState } from 'react';
import {
  LineChart, Line, Tooltip, YAxis,
} from 'recharts';
import PropTypes from 'prop-types';
import RechartsTooltip from 'components/vendor/RechartsTooltip';

function Chart({ data }) {
  const elem = useRef();
  const timer = useRef();
  const [isReady, setReady] = useState(false);

  /**
   * Delay function for the rendering of the charts.  Adds a span element to the page and checks
   * if it is visible on the screen.  If the span element is visible the chart will render.
   */
  useEffect(() => {
    if (!elem.current) { return; }

    timer.current = window.setInterval(() => {
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
      <span ref={elem} />
    );
  }

  return (
    <LineChart
      width={300}
      height={40}
      data={data.map((entry) => ({
        name: 'Total',
        total: entry,
      }))}
    >
      <YAxis type="number" hide domain={['dataMin', 'dataMax']} />
      <Tooltip cursor={false} content={RechartsTooltip} />
      <Line type="monotone" dataKey="total" stroke="#D97800" strokeWidth={2} />
    </LineChart>
  );
}

Chart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Chart;
