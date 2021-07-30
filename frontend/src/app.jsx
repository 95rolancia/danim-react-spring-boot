import styles from './app.module.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SignUp, SignIn, Main, NotFound } from './pages/index.js';
import StartLoading from './components/start-loading';
import PrivateRoute from './routers/private-route';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  return (
    <div className={styles.app}>
      {loading ? (
        <StartLoading />
      ) : (
        <BrowserRouter>
          <Switch>
            <PrivateRoute path="/" exact>
              <Main />
            </PrivateRoute>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
