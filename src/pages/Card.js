import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardImage from 'components/content/CardImage';
import Breadcrumb from 'components/content/Breadcrumb';
import { ThemeContext } from 'contexts/theme';
import { formatObject } from 'js/keys';
import { apiGet } from 'js/api';
import { paths } from 'js/routes';
import { formatYear } from 'js/formats';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Card';

const useStyles = createUseStyles(style);

function Card() {
  const { setId, cardId } = useParams();
  const classes = useStyles(useContext(ThemeContext));

  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const keys = await apiGet('keys');
      const sets = await apiGet('sets');
      const set = await apiGet(`sets/${setId}`);
      const card = await apiGet(`sets/${setId}/${cardId}`);

      setData(formatObject(keys, {
        set: sets[setId],
        ...formatObject(keys, set).cards.find(({ id }) => id === cardId),
        ...card,
      }));
    })();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  const {
    set = {},
    difficulty,
    name,
    popularity = 0,
    score = 0,
    quality,
    variants = [],
  } = data;

  const {
    name: setName,
    cards: setCards,
    year: setYear,
    score: setScore = 0,
    quality: setQuality,
    difficulty: setDifficulty,
    popularity: setPopularity,
  } = set;

  const variantList = variants.map((entry) => (
    <dd key={entry}>
      {entry}
    </dd>
  ));

  return (
    <>
      <Breadcrumb
        links={[
          {
            text: 'Home',
            path: paths.home,
          }, {
            text: 'Sets',
            path: paths.sets,
          }, {
            text: data ? setName : '...',
            path: paths.set(setId, setName),
          }, {
            text: data ? name : '...',
            path: '/card',
          },
        ]}
      />

      <h2 className={classes.name}>{name}</h2>
      <p className={classes.setInfo}>{`${setName} · ${formatYear(setYear)}`}</p>

      <section className={classes.split}>
        <div className={classes.cardGroup}>
          <div>
            <dl>
              <dt className={classes.setScore}>
                Set Score
                <span className={classes.setScoreNumber}>
                  {' '}
                  {setScore}
                </span>
              </dt>
              <dd className={classes.setMetrics}>{`Quality: ${setQuality}`}</dd>
              {' · '}
              <dd className={classes.setMetrics}>{`Difficulty: ${setDifficulty}`}</dd>
              {' · '}
              <dd className={classes.setMetrics}>{`Popularity: ${setPopularity}`}</dd>
            </dl>

            <dl>
              <dt className={classes.setScore}>
              Card Score
                <span className={classes.setScoreNumber}>
                  {' '}
                  {score}
                </span>
              </dt>
              <dd className={classes.setMetrics}>{`Quality: ${quality}`}</dd>
              {' · '}
              <dd className={classes.setMetrics}>{`Difficulty: ${difficulty}`}</dd>
              {' · '}
              <dd className={classes.setMetrics}>{`Popularity: ${popularity}`}</dd>
            </dl>
          </div>

          <div>
            <dl>
              <dt className={classes.setScore}>
              Total graded:
                <span className={classes.setScoreNumber}>
                  {setCards}
                </span>
              </dt>
            </dl>

            <dl>
              <dt className={classes.setScore}>Variants:</dt>
              {variantList}
            </dl>
          </div>
        </div>

        <div className={classes.cardImage}>
          <CardImage
            setId={parseInt(setId, 36)}
            cardId={parseInt(cardId, 36)}
            description="Card"
          />
        </div>
      </section>
    </>
  );
}

export default Card;
