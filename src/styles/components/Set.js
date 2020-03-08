import genericTable from 'styles/components/content/GenericTable';
import text from 'styles/text';

export default {
  ...genericTable,
  ...text,
  setName: {
    margin: 0,
    paddingBottom: 0,
  },
  setInfo: {
    color: '#D97800',
    fontSize: 16,
    marginTop: 0,
  },
  setScore: {
    fontFamily: '\'Oxygen\', sans-serif',
    fontSize: 24,
  },
  setScoreNumber: {
    fontFamily: '\'Roboto Mono\', monospace',
    fontSize: 26,
  },
  setMetrics: {
    display: 'inline-block',
    fontFamily: '\'Oxygen\', sans-serif',
    fontSize: 16,
    margin: 0,
  },
};
