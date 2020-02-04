/**
 * This contains page routes for the entire application.
 * @module [{js}routes]
 */
export const paths = {
  // Core pages.
  home: '/',
  sets: '/sets',
  set: '/set',
  card: '/card'
};

export default [{
  path: paths.home,
  exact: true,
  title: 'Home',
}, {
  path: paths.sets,
  title: 'Sets',
}, {
  path: paths.set,
  title: 'Set',
}, {
  path: paths.card,
  title: 'Card',
}];
