import textStyles from 'styles/text';

export default {
  ...textStyles,

  typeAhead: ({ header: headerTheme }) => ({
    backgroundAttachment: 'fixed',
    backgroundColor: headerTheme.background,
    backgroundImage: 'url("https://i.gradedmetrics.com/background.png")',
    backgroundSize: 'cover',
    border: {
      color: headerTheme.borderColor,
      style: 'solid',
      width: [0, 0, 1, 1],
    },
    borderBottomLeftRadius: 4,
    boxShadow: {
      blur: 3,
      color: '#0F1113',
      y: 3,
    },
    boxSizing: 'border-box',
    height: 40,
    padding: [0, 0, 3, 3],
  }),

  input: {
    backgroundAttachment: 'fixed',
    backgroundColor: '#ccc',
    backgroundImage: 'url("https://i.gradedmetrics.com/background.png")',
    backgroundSize: 'cover',
    border: 'none',
    borderBottomLeftRadius: 4,
    fontSize: 12,
    height: '100%',
    padding: [4, 8],
    transition: 'background-color .2s',

    '&:focus': {
      backgroundColor: '#fff',
      outline: 'none',
    },
  },

  dropdown: {
    backgroundAttachment: 'fixed',
    backgroundColor: '#fff',
    backgroundImage: 'url("https://i.gradedmetrics.com/background.png")',
    backgroundSize: 'cover',
    margin: [-2, 3, 0],
    width: 'calc(100% - 6px)',
  },
};
