import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from 'js/routes';
import pageRoutes from 'js/routes/pages';
import { ThemeContext } from 'contexts/theme';

// Theme.
import { createUseStyles } from 'react-jss';
import style from 'styles/components/Container';

const useStyles = createUseStyles(style);

function Container() {
  const classes = useStyles(useContext(ThemeContext));

  return (
    <section>
      <main className={classes.container}>
        <Switch>
          {routes.map((route) => {
            const pageRoute = pageRoutes[route.path];

            return (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                render={(props) => {
                  document.title = `${route.title ? `${route.title} - ` : ''}Graded Metrics`;

                  return (
                    <pageRoute.component
                      {...props} // eslint-disable-line react/jsx-props-no-spreading
                      {...pageRoute.props} // eslint-disable-line react/jsx-props-no-spreading
                    />
                  );
                }}
              />
            );
          })}
          <Route
            render={() => {
              document.title = '404 - Graded Metrics';
              return <pageRoutes.notFound.component />;
            }}
          />
        </Switch>
      </main>
    </section>
  );
}

export default Container;
