import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Container from 'components/Container';
import Header from 'components/Header';

import { ThemeContext, themes } from "contexts/theme";

// Theme.
import { createTheming } from 'react-jss';
const { ThemeProvider } = createTheming(ThemeContext);


function GradedMetrics() {
  return (
    <>
      <Header/>
      <Container />
    </>
  );
}

ReactDOM.render(
  (
    <ThemeProvider theme={{
      ...themes.dark
    }}>
      <React.StrictMode>
        <BrowserRouter>
          <GradedMetrics />
        </BrowserRouter>
      </React.StrictMode>
    </ThemeProvider>
  ),
  document.getElementById('GradedMetrics'),
);
