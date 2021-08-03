import styles from './app.module.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import {
  SignUp,
  SignIn,
  Main,
  NotFound,
  BoardCreate,
  Interest,
  MyPage,
} from './pages/index.js';
import { StartLoading } from './components';
import useAuth from './hooks/useAuth';
import PrivateRoute from './routers/private-route';

const App = observer(() => {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  useEffect(() => {
    if (localStorage.getItem('user')) {
      auth.silentRefresh();
    }
  });

  return (
    <div className={styles.app}>
      {loading ? (
        <StartLoading />
      ) : (
        // <MyPage />
        <BrowserRouter>
          <Switch>
            <Route path={['/', '/signin']} exact>
              <SignIn />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <PrivateRoute path="/main">
              <Main />
            </PrivateRoute>
            <PrivateRoute path="/interest">
              <Interest />
            </PrivateRoute>
            <PrivateRoute path="/create">
              <BoardCreate />
            </PrivateRoute>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
});

export default App;
