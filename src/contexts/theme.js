/**
 * The theme context controls which style theme to apply to the site (dark or light (to be
 * implemented in phase 2)).
 * @module [{contexts}theme]
 * @default theme.dark
 * @example import { ThemeContext, themes } from "context/theme";
 */
import React from 'react';

const shared = {
  brandPrimary: '#D97800',
  brandSecondary: '#009734',
};

/**
 * The `themes` object contains style variables for each given theme.
 */
export const themes = {
  dark: {
    key: 'dark',
    ...shared,

    header: {
      background: shared.brandPrimary,
    },

    globalSearch: {
      borderColor: shared.brandPrimary,
    },

    languageTag: {
      background: '#ffd5a2',
      color: '#333',
      shadow: shared.brandPrimary,
    },

    pagination: {
      background: '#323232',
    },

    paginationButton: {
      fill: shared.brandSecondary,
    },

    paginationButtonDisabled: {
      fill: '#C1BEBE',
    },

    tag: {
      background: '#eee',
      color: '#333',
      shadow: '#ccc',
    },
  },
};

/**
 * `ThemeContext` is the context API for themes.
 */
export const ThemeContext = React.createContext({
  ...themes.dark,
  changeTheme: () => {},
});
