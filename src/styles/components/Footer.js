export default {
  footer: ({ footer: footerTheme }) => ({
    borderTop: {
      color: footerTheme.borderColor,
      style: 'solid',
      width: 1,
    },
    color: footerTheme.color,
    fontSize: 12,
    lineHeight: '15px',
    margin: [20, 25],
    padding: [20, 0],
  }),
};
