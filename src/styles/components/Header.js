export default {
  header: ({ header: headerTheme }) => ({
    alignItems: 'center',
    background: headerTheme.background,
    boxShadow: {
      blur: 3,
      color: '#0F1113',
      y: 3,
    },
    boxSizing: 'border-box',
    display: 'flex',
    height: 64,
    padding: [0, 25],
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 3,
  }),
  title: {
    flexGrow: 1,
  },
  search: ({ header: headerTheme }) => ({
    background: headerTheme.background,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    boxShadow: {
      blur: 3,
      color: '#0F1113',
      y: 3,
    },
    position: 'absolute',
    right: 25,
    top: '100%',
    width: 320,
  }),
};
