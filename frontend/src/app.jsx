import SignIn from './pages/sign-in/sign-in';
import Main from './pages/main/main';
import { observer } from 'mobx-react-lite';

const App = observer(({ authStore }) => {
  return <>{authStore.isLoggedIn ? <SignIn /> : <Main />}</>;
});

export default App;
