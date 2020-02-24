import textStyles from 'styles/text';

export default {
  ...textStyles,

  typeAhead: {
    height: 32,
  },

  input: ({ globalSearch: globalSearchTheme }) => ({
    backgroundAttachment: 'fixed',
    backgroundColor: '#ccc',
    backgroundImage: 'url("https://i.gradedmetrics.com/background.png")',
    backgroundPositionY: 80,
    backgroundSize: 'cover',
    borderColor: globalSearchTheme.borderColor,
    borderStyle: 'solid',
    borderWidth: [0, 3, 3],
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    fontSize: 12,
    height: '100%',
    padding: [4, 8],
    transition: 'background-color .2s',

    '&:focus': {
      backgroundColor: '#fff',
      outline: 'none',
    },
  }),

  dropdown: {
    backgroundAttachment: 'fixed',
    backgroundColor: '#fff',
    backgroundImage: 'url("https://i.gradedmetrics.com/background.png")',
    backgroundPositionY: 80,
    backgroundSize: 'cover',
    margin: [-2, 3, 0],
    width: 'calc(100% - 6px)',
  },
};
