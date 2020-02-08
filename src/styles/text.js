export default {
  mono: {
    fontFamily: '\'Roboto Mono\', monospace',
    fontSize: '85%',
  },
  tag: ({ tag: tagTheme }) => ({
    background: tagTheme.background,
    boxShadow: {
      blur: 1,
      color: tagTheme.shadow,
      x: 1,
      y: 1,
    },
    color: tagTheme.color,
    fontSize: 12,
    lineHeight: '15px',
    margin: [0, 4],
    padding: [0, 4],
  }),
};
