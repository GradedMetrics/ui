export default {
  wrapper: {
    padding: [0, 40],
  },
  chart: {
    '& svg': {
      overflow: 'visible',
    },
  },
  label: {
    fontSize: 10,
    lineHeight: '12px',
  },
  total: ({ chartColours }) => ({
    fill: chartColours.totalLabel,
  }),
  psa10: ({ chartColours }) => ({
    fill: chartColours.psa10Label,
  }),
};
