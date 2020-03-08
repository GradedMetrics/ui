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
  tooltip: {
    background: 'rgba(33, 33, 33, 0.85)',
    fontSize: 12,
    lineHeight: '15px',
    padding: [4, 8],
  },
  tooltipTitle: {
    color: '#fff',
    textDecoration: 'underline',
  },
  totalLabel: ({ chartColours }) => ({
    color: chartColours.totalLabel,
  }),
  psa10GradesLabel: ({ chartColours }) => ({
    color: chartColours.psa10Label,
  }),
};
