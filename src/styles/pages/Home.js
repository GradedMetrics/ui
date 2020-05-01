export default {
  title: {
    color: '#FFF',
    padding: '14px 0 20px',
    textAlign: 'center',
  },
  banner: ({ banner: bannerTheme }) => ({
    background: {
      attachment: 'fixed',
      color: bannerTheme.background,
      image: 'url("https://i.gradedmetrics.com/background.png")',
      size: 'cover',
    },
    color: bannerTheme.color,
    padding: '7px 15px',
  }),
  siteInfo: {
    background: 'rgba(255,255,255,0.1)',
    marginBottom: 40,
  },
  infoText: {
    padding: [0, 15],
  },
  infoTextUl: {
    marginLeft: 20,
    paddingBottom: 15,
  },
  welcomeContainer: {
    display: 'flex',
    paddingBottom: 10,
  },
  welcome: {
    fontSize: 18,
    paddingRight: 30,
  },
  welcomeAside: {
    fontSize: 14,
  },
  psa: {
    backgroundPosition: ['15px', 'calc(50% - 15px)'],
    backgroundRepeat: 'no-repeat',
    backgroundSize: 64,
    padding: [0, 15, 5, 80],
  },
  psaSmall: {
    padding: [0, 0, 0, 5],
    verticalAlign: 'middle',
    width: 48,
  },
};
