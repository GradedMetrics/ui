import React from 'react';
import Breadcrumb from 'components/content/Breadcrumb';
import GenericTable from 'components/content/GenericTable';
import keys from 'js/keys.json';
import sets from 'js/sets.json';

function Sets() {
  const formattedSets = Object.values(sets).map( set => {
    return Object.entries(set).reduce((obj, [ key, value ]) => {
      const k = Object.entries(keys).find(entry => entry[1] === key);
      console.warn(k);
      return {
        ...obj,
        [k[0]]: value
      };
    }, {})
  });
  console.log(formattedSets);

  return (
    <>
      <Breadcrumb
        links={[
          {
            text: 'foo',
            path: '/foo',
          }, {
            text: 'bar',
            path: '/bar',
          },
        ]}
      />

      <h2>Sets</h2>

      <GenericTable 
        tableHeaders={[{
          sr: 'Name',
          value: 'Name'
        }, {
          sr: 'GM Score',
          value: 'GM Score'
        }, {
          sr: 'Graph'
        }, {
          sr: 'Actions'
        }]}
        tableData={formattedSets.map(({
          cards,
          difficulty,
          id,
          name,
          popularity = 0,
          quality,
          score = 0,
          total,
          variant,
          year
        }) => {
          return [
            <>
              <span>Pokemon {name}
                {variant ? ` (${variant})` : ''}
              </span>
              <span>
              {/* <Year value={year} /> */}
              {` - ${cards} cards`}</span>
            </>,
            <>
              <span>{score}</span>
              <span>{`Quality: ${quality}. Difficulty: ${difficulty}. Popularity: ${popularity}.`}</span>
            </>,
            <></>,
            <></>
          ]
        })}
        />
    </>
  );
}

export default Sets;
