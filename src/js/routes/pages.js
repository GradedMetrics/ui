/**
 * This maps routes to a given page component for use within the `<Container />` component.
 * @module [{js/routes}pages]
 */
import Error404 from 'pages/Error404';
import Home from 'pages/Home';
import Sets from 'pages/Sets';
import Set from 'pages/Set';
import Card from 'pages/Card';

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

  [paths.sets]: {
    component: Sets,
  },

  [paths.set]: {
    component: Set,
  },

  [paths.card]: {
    component: Card,
  },
};

export default routes;
