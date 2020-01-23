import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Container from 'components/Container';
import Footer from 'components/Footer';
import Navigation from 'components/Navigation';

function GradedMetrics() {
  return (
    <>
      <Navigation />
      <Container />
      <p>I love James</p>
      <Footer />
    </>
  );
}

ReactDOM.render(
  (
    <React.StrictMode>
      <BrowserRouter>
        <GradedMetrics />
      </BrowserRouter>
    </React.StrictMode>
  ),
  document.getElementById('GradedMetrics'),
);
