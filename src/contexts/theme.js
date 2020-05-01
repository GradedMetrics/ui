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
  brandPrimaryDark: '#B06100',
  brandPrimaryLight: '#FC9A23',
  brandSecondary: '#009734',
};

/**
 * The `themes` object contains style variables for each given theme.
 */
export const themes = {
  dark: {
    key: 'dark',
    ...shared,

    chartColours: {
      psa10: 'rgba(193, 190, 190, 0.3)',
      psa10Label: '#C1BEBE',
      total: shared.brandPrimary,
      totalLabel: shared.brandPrimary,
    },

    chartPSAGrades: {
      auth: '#72bb57',
      1: '#9f9c89',
      '1Q': '#4a1646',
      1.5: '#862466',
      2: '#a074d2',
      '2Q': '#c715a4',
      2.5: '#adc338',
      3: '#7b3812',
      '3Q': '#9bf887',
      3.5: '#33d523',
      4: '#b65908',
      '4Q': '#afdd4d',
      4.5: '#fc5ef4',
      5: '#a69ec0',
      '5Q': '#2801f6',
      5.5: '#3751aa',
      6: '#869e61',
      '6Q': '#b6b637',
      6.5: '#d5ea8b',
      7: '#c60ec9',
      '7Q': '#c25ec2',
      7.5: '#7f3b9a',
      8: '#42a2bd',
      '8Q': '#abc923',
      8.5: '#9e350c',
      9: '#68b1df',
      '9Q': '#eb64a6',
      10: '#52d465',
    },

    footer: {
      borderColor: '#232323',
      color: '#C1BEBE',
    },

    header: {
      background: shared.brandPrimary,
      borderColor: shared.brandPrimaryLight,
    },

    banner: {
      background: shared.brandPrimary,
      color: '#333',
    },

    languageTag: {
      background: '#ffd5a2',
      color: '#333',
      shadow: shared.brandPrimary,
    },

    navLink: {
      background: shared.brandPrimary,
      borderColor: shared.brandPrimaryDark,
      shadow: shared.brandPrimaryLight,
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
