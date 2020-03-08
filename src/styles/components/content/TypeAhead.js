export default {
  container: {
    position: 'relative',
    width: '100%',
  },
  input: (theme) => ({
    boxSizing: 'border-box',
    fontFamily: '\'Roboto Mono\', monospace',
    display: 'block',
    outlineColor: theme.brandSecondary,
    padding: [4, 8],
    width: '100%',
  }),
  dropdown: {
    background: '#fff',
    boxShadow: {
      blur: 2,
      color: '#000',
      x: 2,
      y: 2,
    },
    boxSizing: 'border-box',
    color: '#333',
    fontFamily: '\'Oxygen\', sans-serif',
    listStyle: 'none',
    margin: 0,
    maxHeight: '50vh',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: 8,
    position: 'absolute',
    top: '100%',
    width: '100%',
    zIndex: 2,
  },
  category: {
    margin: [0, 0, 8],

    '&:last-child': {
      marginBottom: 0,
    },
  },
  heading: {
    fontSize: 12,
    fontWeight: 700,
    lineHeight: '15px',
    verticalAlign: 'top',
  },
  results: {
    listStyle: 'none',
    padding: 0,
    margin: [0, 0, 8],

    '&:last-child': {
      marginBottom: 0,
    },
  },
  result: {
    boxSizing: 'border-box',
    display: 'block',
    fontSize: 14,
    lineHeight: '17px',
    width: '100%',
  },
  resultButton: (theme) => {
    const marginOffset = 8;

    return {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'block',
      lineHeight: '16px',
      margin: [0, -marginOffset],
      outline: 'none',
      padding: [4, 0, 4, 16],
      textAlign: 'left',
      width: `calc(100% + ${marginOffset * 2}px)`,

      '&:hover': {
        background: theme.brandSecondary,
        color: '#fff',
      },

      '&:focus': {
        background: theme.brandSecondary,
        color: '#fff',
      },
    };
  },
};
