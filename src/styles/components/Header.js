export default {
  header: ({ header: headerTheme }) => ({
    alignItems: 'center',
    background: headerTheme.background,
    display: 'flex',
    height: '80px',
    padding: [0, 25],
  }),
  title: {
    flexGrow: 1,
  },
  search: {
    flex: {
      basis: 320,
      grow: 0,
      shrink: 0,
    },
  },
};
