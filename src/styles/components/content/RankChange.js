export default {
  wrapper: {
    color: '#C1BEBE',
    display: 'block',
    fontFamily: '\'Roboto Mono\', monospace',
    fontSize: 14,
    lineHeight: '17px',
    textAlign: 'center',
  },
  inlineWrapper: {
    color: '#C1BEBE',
    display: 'inline-block',
    fontFamily: '\'Roboto\', sans-serif',
    fontSize: 13,
    lineHeight: '16px',
    textAlign: 'center',
  },
  negative: {
    color: 'tomato',
  },
  positive: {
    color: 'green',
  },
  symbol: {
    display: 'block',
  },
  symbolNegative: {
    fill: 'tomato',
  },
  symbolPositive: {
    fill: 'green',
  },
  change: {
    display: 'block',

    '&:first-child': {
      margin: [0, 0, 4],
    },

    '&:last-child': {
      margin: [4, 0, 0],
    },
  },
  inlineChange: {
    display: 'inline-block',
  },
};
