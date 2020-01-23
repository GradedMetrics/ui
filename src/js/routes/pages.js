/**
 * This maps routes to a given page component for use within the `<Container />` component.
 * @module [{js/routes}pages]
 */
import Error404 from 'pages/Error404';
import Home from 'pages/Home';

import { paths } from '../routes';

const routes = {
  // 404
  notFound: {
    component: Error404,
  },

  // Core pages
  [paths.home]: {
    component: Home,
  },
};

export default routes;
