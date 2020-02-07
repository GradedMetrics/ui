import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TypeAhead from 'components/content/TypeAhead';
import { apiGet } from 'js/api';
import { formatObjectArray } from 'js/keys';
import { paths } from 'js/routes';

function GlobalSearch() {
  const [data, setData] = useState([]);

  function formatResult(name) {
    return (
      <Link to={paths.search(name)}>
        {name}
      </Link>
    );
  }

  /**
   * Format set objects.
   * @param {Object} set - A matched set object.
   */
  function formatSet({
    id,
    name,
  }) {
    return (
      <Link to={paths.set(id, encodeURIComponent(name))}>
        {name}
      </Link>
    );
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
        entries: pokemon,
        format: formatResult,
        title: 'Pokémon',
      }, {
        entries: formatObjectArray(keys, Object.values(sets)),
        format: formatSet,
        matchKey: 'name',
        title: 'Sets',
      }, {
        entries: trainers,
        format: formatResult,
        title: 'Trainer cards',
      }, {
        entries: stadiums,
        format: formatResult,
        title: 'Stadium cards',
      }, {
        entries: energies,
        format: formatResult,
        title: 'Energy cards',
      }]);
    })();
  }, []);

  return (
    <TypeAhead data={data} />
  );
}

export default GlobalSearch;
