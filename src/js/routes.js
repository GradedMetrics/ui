/**
 * This contains page routes for the entire application.
 * @module [{js}routes]
 */
export const paths = {
  // Core pages.
  home: '/',
  card: (setId = ':setId', cardId = ':cardId') => `/set/${setId}/card/${cardId}`,
  cards: '/cards',
  search: (result = ':result') => `/search/${result}`,
  sets: (queryString = '') => `/sets${queryString ? `?${queryString}` : ''}`,
  set: (setId = ':setId', setName = '', queryString = '') => `/set/${setId}${setName ? `/${setName}` : ''}${queryString ? `?${queryString}` : ''}`,
};

export const urlFriendlyName = (name) => encodeURIComponent(name.replace(/ /g, '_'));

export default [{
  path: paths.home,
  exact: true,
  title: 'Home',
}, {
  path: paths.card(),
  title: 'Card',
}, {
  path: paths.sets(),
  exact: true,
  title: 'Sets',
}, {
  path: paths.set(),
  title: 'Set',
}];
