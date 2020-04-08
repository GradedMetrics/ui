import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from 'contexts/theme';
import Tooltip from 'components/content/Tooltip';
import { pathNames, paths } from 'js/routes';
import { help } from 'js/text';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/pages/Home';

import PSALogo from 'assets/images/logo-psa.png';

const useStyles = createUseStyles(style);

function Home() {
  const classes = useStyles(useContext(ThemeContext));

  return (
    <>
      <h2>Welcome</h2>
      <article className={classes.welcomeContainer}>
        <p className={classes.welcome}>
          Welcome to Graded Metrics, a website dedicated to untangling, analysing and providing
          {' '}
          statistics for 
          <img
            className={classes.psaSmall}
            src={PSALogo}
            alt="PSA"
          />
          -graded Pokémon cards.
        </p>
        <aside className={classes.welcomeAside}>
          <p>
            Graded Metrics is not associated with or endorsed by PSA in any way, we simply make use of
            {' '}
            their public-facing
            {' '}
            <a
              href="https://www.psacard.com/pop"
              rel="noopener noreferrer"
            >
              Population Report
            </a>
            {' '}
            to provide you with time-based metrics.
          </p>
          <p>
            Data is updated on a weekly basis every Wednesday.
          </p>
        </aside>
      </article>
      <article>
        <h3>What is PSA?</h3>
        <div
          className={classes.psa}
          style={{
            backgroundImage: `url(${PSALogo})`,
          }}
        >
          <p>
            Professional Sports Authenticator, PSA, is the
            {' '}
            <em>
              largest and most trusted third-party grading and authentication company in the world
            </em>
            , in
            {' '}
            <a
              href="https://www.psacard.com/about/"
              rel="noopener noreferrer"
            >
              their words
            </a>
            , at least. With a primary focus on sports-related cards, PSA also grades Magic: The
            {' '}
            Gathering, Pokémon and even Fortnite trading cards, having recently graded their
            {' '}
            <a
              href="https://www.psacard.com/articles/articleview/9990/psa-certifies-1-millionth-poke-mon-card"
              rel="noopener noreferrer"
            >
              1 millionth Pokémon card
            </a>
            {' '}
            in October 2019.
          </p>
        </div>
      </article>
      <article>
        <h3>What does Graded Metrics do?</h3>
        <p>
          Along with providing a searchable database of all the Pokémon sets, cards, coins and
          {' '}
          stickers PSA grades, Graded Metrics also...
        </p>
        <ul>
          <li>
            Calculates the difficulty
            {' '}
            <Tooltip
              id="tooltip-difficulty"
              position="top"
              text={help.difficulty}
            />
            , quality
            {' '}
            <Tooltip
              id="tooltip-quality"
              position="top"
              text={help.quality}
            />
            {' '}
            and volatility
            {' '}
            <Tooltip
              id="tooltip-volatility"
              position="top"
              text={help.volatility}
            />
            {' '}
            of every set and every card;
          </li>
          <li>
            Provides a popularity ranking for each set (see the
            {' '}
            <Link to={paths.sets()}>
              {pathNames.sets}
            </Link>
            {' '}
            page);
          </li>
          <li>
            Provides a ranking system based on score
            {' '}
            <Tooltip
              id="tooltip-score"
              position="top"
              text={help.score}
            />
            {' '}
            (see the
            {' '}
            <Link to={paths.top100CardsByScore()}>
              {pathNames.top100CardsByScore}
            </Link>
            {' '}
            page);
          </li>
          <li>
            Normalizes PSA&#39;s data*
          </li>
        </ul>
      </article>
    </>
  );
}

export default Home;
