export default {
  wrapper: {
    padding: [0, 40],
  },
  chart: {
    '& svg': {
      overflow: 'visible',
    },
  },
  label: ({ chartLabel: chartLabelTheme }) => ({
    fill: chartLabelTheme.color,
    fontSize: 10,
    lineHeight: '12px',
  }),
};
