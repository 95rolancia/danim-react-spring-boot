import { observer } from 'mobx-react-lite';
import styles from './app.module.css';
import Main from './pages/main/main';
import Start from './pages/start/start';

const App = observer(({ authStore }) => {
  return (
    <div className={styles.app}>
      {authStore.isLoggedIn ? <Main /> : <Start />}
    </div>
  );
});

export default App;
