/**
 * This contains page routes for the entire application.
 * @module [{js}routes]
 */
export const paths = {
  // Core pages.
  home: '/',
  card: (setId = ':setId', cardId = ':cardId') => `/set/${setId}/card/${cardId}`,
  search: (result = ':result') => `/search/${result}`,
  sets: (queryString = '') => `/sets${queryString ? `?${queryString}` : ''}`,
  set: (setId = ':setId', setName = '', queryString = '') => `/set/${setId}${setName ? `/${setName}` : ''}${queryString ? `?${queryString}` : ''}`,
  top100CardsByFewest10s: (queryString = '') => `/top-cards-by-fewest-10s${queryString ? `?${queryString}` : ''}`,
  top100CardsByScore: (queryString = '') => `/top-cards-by-score${queryString ? `?${queryString}` : ''}`,
};

export const pathNames = {
  home: 'Home',
  card: (cardName = '{card.name}') => cardName,
  sets: 'Sets',
  set: (setName = '{set.name}', setVariant = '') => `${setName}${setVariant ? ` (${setVariant})` : ''}`,
  top100CardsByFewest10s: 'Top 100 Cards by Fewest PSA 10 Grades',
  top100CardsByScore: 'Top 100 Cards by Difficulty Score',
};

export const urlFriendlyName = (name) => encodeURIComponent(name.replace(/ /g, '_'));

export default [{
  path: paths.home,
  exact: true,
  title: pathNames.home,
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
}, {
  path: paths.top100CardsByFewest10s(),
  title: pathNames.top100CardsByFewest10s,
}, {
  path: paths.top100CardsByScore(),
  title: pathNames.top100CardsByScore,
}];
