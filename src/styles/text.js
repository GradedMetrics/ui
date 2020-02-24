const tagStyle = (theme) => ({
  boxShadow: {
    blur: 1,
    color: theme.shadow,
    x: 1,
    y: 0,
  },
  color: theme.color,
  display: 'inline-block',
  fontSize: '85%',
  lineHeight: '15px',
  margin: [0, 4],
  padding: [0, 4],
});

export default {
  mono: {
    fontFamily: '\'Roboto Mono\', monospace',
    fontSize: '85%',
  },
  tag: ({ tag: tagTheme }) => ({
    background: tagTheme.background,
    ...tagStyle(tagTheme),
  }),
  languageTag: ({ languageTag: languageTagTheme }) => ({
    background: languageTagTheme.background,
    ...tagStyle(languageTagTheme),
  }),
};
