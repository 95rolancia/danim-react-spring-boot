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
} from './pages/index.js';
import { StartLoading } from './components';
import useAuth from './hooks/useAuth';
import useUser from './hooks/useUser';
import PrivateRoute from './routers/private-route';
<<<<<<< HEAD
import PlanRoute from './routers/plan-route';
import StoryRoute from './routers/story-route';
import StoryDetailRoute from './routers/story-detail-route';
=======
>>>>>>> 8d855c0 (feat: [#808] change plan routing)

const App = observer(() => {
  const auth = useAuth();
  const user = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  useEffect(() => {
    if (localStorage.getItem('user')) {
      auth.silentRefresh().then(() => {
        user.getUser();
      });
    }
  });

  return (
    <div className={styles.app}>
      {loading ? (
        <StartLoading />
      ) : (
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
            <StoryRoute path="/read/:no" />
            <StoryDetailRoute path="/detail/:no" />
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
