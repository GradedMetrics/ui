import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Progress from 'components/content/Progress';
import { apiGet, delay, getVersion } from 'js/api';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/SplashScreen';

const useStyles = createUseStyles(style);

function SplashScreen({
  isPreLoad = true,
  newVersion = -1,
  onDataReady = () => {},
}) {
  const classes = useStyles(useContext(ThemeContext));

  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerMessage, setBannerMessage] = useState('');
  const [progress, setProgress] = useState([]);
  const [step, setStep] = useState(0);
  const delayDuration = 750;

  useEffect(() => {
    if (!progress.length) {
      return;
    }

    setStep(progress.length);
  }, [progress]);

  /**
   * Updates the progress state.
   * @param {String} message - A new progress message.
   */
  function updateProgress(message) {
    setProgress([
      ...progress,
      message,
    ]);
  }

  /**
   * The primary purpose of this component is to hide the website from the user until data from the
   * API has been downloaded. This effect hook handles just that. If `isPreLoad` is truthy or
   * `newVersion` is set to -1 we do not need to do any of this. Once the new data is fetched, the
   * `onDataReady` callback is called to tell the application's entry point to hide this component
   * and load the application as usual.
   */
  useEffect(() => {
    if (isPreLoad || newVersion === -1) {
      return;
    }

    (async () => {
      if (step === 0) {
        // Firstly clear the currently cached data.
        const oldVersion = getVersion();
        if (oldVersion === -1) {
          setBannerTitle('Welcome to Graded Metrics!');
          setBannerMessage('We\'re just setting a few things up. This shouldn\'t take long.');
        } else {
          setBannerTitle('Welcome back to Graded Metrics!');
          setBannerMessage(`One sec whilst we update you from version 1.${oldVersion} to version 1.${newVersion}.`);
        }

        await delay(delayDuration);

        localStorage.removeItem('api');
        updateProgress('Removing old data');
        return;
      }

      if (step === 1) {
        // Fetch the new Pokémon list.
        await apiGet('pokemon', false, newVersion, delayDuration);
        updateProgress('Searching for Pokémon in the wild');
        return;
      }

      if (step === 2) {
        // Fetch the new sets list.
        await apiGet('sets', false, newVersion, delayDuration);
        updateProgress('Updating all the sets');
        return;
      }

      if (step === 3) {
        // Fetch the trainer cards list.
        await apiGet('trainers', false, newVersion, delayDuration / 2);
        updateProgress('Shuffling trainer cards');
        return;
      }

      if (step === 4) {
        // Fetch the stadium cards list.
        await apiGet('stadiums', false, newVersion, delayDuration / 2);
        updateProgress('Trading stadiums cards');
        return;
      }

      if (step === 5) {
        // Fetch the energy cards list.
        await apiGet('energies', false, newVersion, delayDuration / 2);
        updateProgress('Hoarding energy cards');
        return;
      }

      if (step === 6) {
        // Fetch the keys.
        await apiGet('keys', false, newVersion, delayDuration);
        updateProgress('Putting everything together');
        return;
      }

      await delay(delayDuration * 3);
      // We're done. Update the cached API version to match the new version.
      localStorage.setItem('version', newVersion);
      onDataReady();
    })();
  }, [isPreLoad, step]);

  return (
    <section>
      {/* The main message title. */}
      <h1 className={classes.bannerTitle}>{bannerTitle}</h1>

      {/* The main message. */}
      <p className={classes.bannerMessage}>{bannerMessage}</p>

      {/* Progress bar */}
      {isPreLoad ? undefined : (<Progress target={7} value={step} />)}

      {/* Progress (lets the user know something is happening in the background). */}
      {progress.length ? (
        <ul className={classes.progressList}>
          {progress.map((entry) => (
            <li key={entry} className={classes.progressListEntries}>
              {entry}
            </li>
          ))}
        </ul>
      ) : undefined}
    </section>
  );
}

SplashScreen.propTypes = {
  /** Is this just a preload? If not, we need to fetch new data. */
  isPreLoad: PropTypes.bool.isRequired,

  /** What should the new version number be? */
  newVersion: PropTypes.number.isRequired,

  /** What should happen when new data is loaded? */
  onDataReady: PropTypes.func.isRequired,
};

export default SplashScreen;
