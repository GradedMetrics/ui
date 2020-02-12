import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SetIcon from 'components/content/SetIcon';
import TypeAhead from 'components/content/TypeAhead';
import { apiGet } from 'js/api';
import { formatYear } from 'js/formats';
import { formatObjectArray } from 'js/keys';
import { paths, urlFriendlyName } from 'js/routes';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/text';

const useStyles = createUseStyles(style);

function GlobalSearch() {
  const classes = useStyles(useContext(ThemeContext));

  const [data, setData] = useState([]);

  /**
   * Format data objects.
   * @param {Object} data - A matched data object.
   */
  function formatResult({
    name,
    number,
    language,
    translation,
  }) {
    return (
      <>
        {number ? (
          <>
            <span className={classes.mono}>
              #
              {number}
            </span>
            &nbsp;
            ·
            &nbsp;
          </>
        ) : undefined}
        <Link to={paths.search(urlFriendlyName(name))}>
          {name}
        </Link>
        {language ? (
          <>
            &nbsp;
            {`(${translation})`}
            &nbsp;
            <span className={classes.tag}>{language}</span>
          </>
        ) : undefined}
      </>
    );
  }

  formatResult.defaultProps = {
    language: undefined,
    translation: undefined,
  };

  formatResult.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    language: PropTypes.string,
    translation: PropTypes.string,
  };

  /**
   * Format set objects.
   * @param {Object} set - A matched set object.
   */
  function formatSet({
    icon,
    id,
    name,
    variant,
    year,
  }) {
    return (
      <>
        <span className={classes.mono}>
          {formatYear(year)}
        </span>
        &nbsp;
        ·
        &nbsp;
        {icon
          ? (
            <>
              <SetIcon filename={icon} set={name} />
              {' '}
            </>
          ) : undefined}
        <Link to={paths.set(id, urlFriendlyName(name))}>
          {name}
        </Link>
        {variant ? (
          <span className={classes.tag}>{variant}</span>
        ) : undefined}
      </>
    );
  }

  formatSet.defaultProps = {
    icon: undefined,
    variant: undefined,
  };

  formatSet.propTypes = {
    icon: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    variant: PropTypes.string,
    year: PropTypes.string.isRequired,
  };

  /**
   * Sort matching data results.
   */
  function sortResult(resultA, resultB) {
    const { name: resultAName, number: resultANumber, translation: resultATranslation } = resultA;
    const { name: resultBName, number: resultBNumber } = resultB;

    if (resultANumber !== resultBNumber) {
      return resultANumber > resultBNumber ? 1 : -1;
    }

    if (resultAName === resultBName) return 0;
    if (resultATranslation === resultBName) return 1;
    return resultAName > resultBName ? 1 : -1;
  }

  /**
   * Sort matching set results.
   */
  function sortSet(setA, setB) {
    const { name: setAName, year: setAYearRaw } = setA;
    const { name: setBName, year: setBYearRaw } = setB;
    const setAYear = Number(formatYear(setAYearRaw).substr(0, 4));
    const setBYear = Number(formatYear(setBYearRaw).substr(0, 4));

    if (setAYear === setBYear) {
      if (setAName === setBName) return 0;
      return setAName > setBName ? 1 : -1;
    }

    return setAYear > setBYear ? 1 : -1;
  }

  /**
   * Combine the name and translation into a new key to aid searching. With this, if a user
   * searches for "Dugtrio" it will also return Digdri (German) and Triopikeur (French).
   * @param {Array} dataset - An array of data objects.
   */
  function withSearchTranslation(dataset) {
    return dataset.map((entry) => {
      const {
        name,
        translation,
      } = entry;

      return {
        ...entry,
        search: translation ? `${name} ${translation}` : name,
      };
    });
  }

  useEffect(() => {
    (async () => {
      const keys = await apiGet('keys');
      const pokemon = await apiGet('pokemon');
      const energies = await apiGet('energies');
      const stadiums = await apiGet('stadiums');
      const trainers = await apiGet('trainers');
      const sets = await apiGet('sets');

      setData([{
        entries: withSearchTranslation(formatObjectArray(keys, Object.values(pokemon))),
        format: formatResult,
        searchField: 'search',
        searchKey: 'name',
        sort: sortResult,
        title: 'Pokémon',
      }, {
        entries: formatObjectArray(keys, Object.values(sets)),
        format: formatSet,
        searchField: 'name',
        searchKey: 'id',
        sort: sortSet,
        title: 'Sets',
      }, {
        entries: withSearchTranslation(formatObjectArray(keys, Object.values(trainers))),
        format: formatResult,
        searchField: 'search',
        searchKey: 'name',
        sort: sortResult,
        title: 'Trainer cards',
      }, {
        entries: withSearchTranslation(formatObjectArray(keys, Object.values(stadiums))),
        format: formatResult,
        searchField: 'search',
        searchKey: 'name',
        sort: sortResult,
        title: 'Stadium cards',
      }, {
        entries: withSearchTranslation(formatObjectArray(keys, Object.values(energies))),
        format: formatResult,
        searchField: 'search',
        searchKey: 'name',
        sort: sortResult,
        title: 'Energy cards',
      }]);
    })();
  }, []);

  return (
    <TypeAhead data={data} />
  );
}

export default GlobalSearch;
