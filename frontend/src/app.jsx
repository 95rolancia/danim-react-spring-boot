import styles from './app.module.css';
import { useState, useEffect } from 'react';
import authStore from './stores/auth-store';
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
            <PrivateRoute path="/" authStore={authStore} exact>
              <Main />
            </PrivateRoute>
            <Route path="/signin">
              <SignIn authStore={authStore} />
            </Route>
            <Route path="/signup">
              <SignUp authStore={authStore} />
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
