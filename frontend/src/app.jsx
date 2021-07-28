import styles from './app.module.css';
import { useState, useEffect } from 'react';
import StartLoading from './components/start-loading';
import AuthMainRouter from './routers/auth-main-router';
import authStore from './stores/auth-store';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  });

  return (
    <div className={styles.app}>
      {loading ? <StartLoading /> : <AuthMainRouter authStore={authStore} />}
    </div>
  );
};

export default App;
