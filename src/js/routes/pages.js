/**
 * This maps routes to a given page component for use within the `<Container />` component.
 * @module [{js/routes}pages]
 */
import Card from 'pages/Card';
import Error404 from 'pages/Error404';
import Home from 'pages/Home';
import Sets from 'pages/Sets';
import Set from 'pages/Set';
import Top100CardsByFewest10s from 'pages/Top100CardsByFewest10s';
import Top100CardsByScore from 'pages/Top100CardsByScore';

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

  [paths.card()]: {
    component: Card,
  },

  [paths.sets()]: {
    component: Sets,
  },

  [paths.set()]: {
    component: Set,
  },

  [paths.top100CardsByFewest10s()]: {
    component: Top100CardsByFewest10s,
  },

  [paths.top100CardsByScore()]: {
    component: Top100CardsByScore,
  },
};

export default routes;
