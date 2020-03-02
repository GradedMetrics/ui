import text from 'styles/text';

export default {
  ...text,
  name: {
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
  split: {
    display: 'flex',
    width: '100%',
  },
  cardImage: {
    flexBasis: 480,
    flexGrow: 0,
    flexShrink: 0,
  },
  cardGroup: {
    flexGrow: 1,
    marginRight: 50,
  },
  infoGroup: {
    display: 'flex',
  },
  infoGroupMetrics: {
    width: '50%',
  },
  variants: {
    fontFamily: '\'Barlow Condensed\', sans-serif',
    fontSize: 16,
    margin: 0,
  },
};
