import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Container from 'components/Container';
import Header from 'components/Header';
import SplashScreen from 'components/SplashScreen';
import { apiGet, getVersion } from 'js/api';

import { ThemeContext, themes } from 'contexts/theme';

// Theme.
import { createTheming } from 'react-jss';

const { ThemeProvider } = createTheming(ThemeContext);

function GradedMetrics() {
  const [isLoading, setLoading] = useState(true);
  const [isDataLoaded, setDataLoaded] = useState(false);
  const [newVersion, setNewVersion] = useState(-1);

  /**
   * When the application first loads we need to check if the user has the most recent API data.
   * If they do, we can immediately load the application, otherwise we need to defer to the
   * SplashScreen component to get everything ready for us.
   */
  useEffect(() => {
    (async () => {
      const userVersion = getVersion();
      const { v: version } = await apiGet('version');

      if (userVersion === version) {
        // The user's version is up to date, we're good to go.
        setDataLoaded(true);
        setLoading(false);
        return;
      }

      // Defer to the SplashScreen component to perform caching. ... Smashing!
      setNewVersion(version);
      setLoading(false);
    })();
  }, []);

  if (isLoading || !isDataLoaded) {
    return (
      <SplashScreen
        isPreLoad={isLoading}
        newVersion={newVersion}
        onDataReady={() => setDataLoaded(true)}
      />
    );
  }

  return (
    <>
      <Header />
      <Container />
    </>
  );
}

ReactDOM.render(
  (
    <ThemeProvider theme={{
      ...themes.dark,
    }}
    >
      <React.StrictMode>
        <BrowserRouter>
          <GradedMetrics />
        </BrowserRouter>
      </React.StrictMode>
    </ThemeProvider>
  ),
  document.getElementById('GradedMetrics'),
);
