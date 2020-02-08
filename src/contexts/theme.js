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

    tag: {
      background: '#eee',
      color: '#333',
      shadow: '#e0e0e0',
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
