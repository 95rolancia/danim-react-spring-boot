import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SignIn from './pages/sign-in/sign-in'
import SignUp from './pages/sign-up/sign-up'
import Main from './pages/main/main'
import Search from './pages/search/search'
import Trip from './pages/trip/trip'
import Bookmark from './pages/bookmark/bookmark'
import Profile from './pages/profile/profile'
import Navbar from './components/navbar/navbar';
// import styles from './app.module.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={['/', '/signin']} exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/main" exact>
          <Main />
        </Route>
        <Route path="/search" exact>
          <Search />
        </Route>
        <Route path="/trip" exact>
          <Trip />
        </Route>
        <Route path="/bookmark" exact>
          <Bookmark />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
      </Switch>
      <Navbar />
    </BrowserRouter>
  );
}

export default App;
