import React, { useContext } from 'react';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Header';

const useStyles = createUseStyles(style);

function SetsTable() {
  const classes = useStyles(useContext(ThemeContext));

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>GM Score</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span>Pokemon Japanese Venusaur/Charizard/Blastoise Random Constructed Starter Deck</span>
              <span>1999 - 123 cards</span>
            </td>
            <td>
              <span>71,064</span>
              <span>Quality: 94.  Difficulty: 63.  Popularity: 12.</span>
            </td>
            <td>graph placeholder</td>
            <td />
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default SetsTable;
