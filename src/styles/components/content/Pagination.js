export default {
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  pagination: ({ pagination: paginationTheme }) => ({
    alignItems: 'center',
    background: paginationTheme.background,
    display: 'flex',
    fontSize: 14,
    height: 26,
    lineHeight: '16px',
    margin: [13, 0, 0],
    width: 240,
    padding: [0, 4],
  }),
  pageActions: {
    flexBasis: 48,
    flexGrow: 0,
    flexShrink: 0,
    margin: 0,
  },
  pageSelection: {
    flexGrow: 1,
    flexShrink: 0,
    margin: [0, 4],
    textAlign: 'center',
  },
  button: ({
    paginationButton: paginationButtonTheme,
    paginationButtonDisabled: paginationButtonDisabledTheme,
  }) => ({
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    display: 'inline-flex',
    justifyContent: 'center',
    margin: [0, 6, 0, 0],
    padding: 0,
    width: 18,

    '&:last-child': {
      margin: 0,
    },

    '& svg': {
      fill: paginationButtonTheme.fill,
    },

    '&:disabled': {
      '& svg': {
        fill: paginationButtonDisabledTheme.fill,
      },
    },
  }),
};
