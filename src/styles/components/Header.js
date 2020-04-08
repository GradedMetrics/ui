import LogoImage from 'assets/images/logo.png';

export default {
  header: ({ header: headerTheme }) => ({
    alignItems: 'center',
    background: {
      attachment: 'fixed',
      color: headerTheme.background,
      image: 'url("https://i.gradedmetrics.com/background.png")',
      size: 'cover',
    },
    borderBottom: {
      color: headerTheme.borderColor,
      style: 'solid',
      width: 1,
    },
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
  titleContainer: {
    flexGrow: 1,
  },
  title: {
    background: {
      color: 'transparent',
      image: `url(${LogoImage})`,
      position: [0, '50%'],
      repeat: 'no-repeat',
      size: 42,
    },
    color: '#000',
    display: 'inline-block',
    padding: [0, 0, 0, 67],

    '&:visited, &:focus, &:hover, &:active': {
      color: '#000',
    },
  },
  search: {
    position: 'absolute',
    right: 0,
    top: '100%',
    width: 320,
  },
  navigation: {
    height: '100%',
  },
  list: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    listStyle: 'none',
    margin: 0,
    overflow: 'hidden',
  },
  listItem: {
    flexGrow: 1,
    height: 32,
    margin: [0, 12],

    '&:first-child': {
      marginLeft: 0,
    },

    '&:last-child': {
      marginRight: 0,
    },
  },
  link: ({ navLink: navLinkTheme }) => ({
    alignItems: 'center',
    background: {
      attachment: 'fixed',
      color: navLinkTheme.background,
      image: 'url("https://i.gradedmetrics.com/background.png")',
      size: 'cover',
    },
    border: {
      color: 'transparent',
      style: 'solid',
      width: 1,
    },
    boxShadow: {
      blur: 1,
      color: 'transparent',
      y: 1,
    },
    borderRadius: 4,
    color: '#000',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    padding: [0, 8],
    textDecoration: 'none',
    transition: 'background .2s, border-color .2s, box-shadow .2s',

    '&:visited': {
      color: '#000',
      textDecoration: 'none',
    },

    '&:hover': {
      backgroundColor: navLinkTheme.shadow,
      borderColor: navLinkTheme.borderColor,
      boxShadow: {
        blur: 1,
        color: navLinkTheme.shadow,
        y: 1,
      },
      color: '#000',
    },

    '&:focus': {
      backgroundColor: navLinkTheme.shadow,
      borderColor: navLinkTheme.borderColor,
      boxShadow: {
        blur: 1,
        color: navLinkTheme.shadow,
        y: 1,
      },
      color: '#000',
    },
  }),
  linkActive: ({ navLink: navLinkTheme }) => ({
    borderColor: navLinkTheme.borderColor,
    boxShadow: {
      blur: 1,
      color: navLinkTheme.shadow,
      y: 1,
    },
    cursor: 'default',

    '&:hover': {
      backgroundColor: navLinkTheme.background,
    },

    '&:focus': {
      backgroundColor: navLinkTheme.background,
    },
  }),
};
