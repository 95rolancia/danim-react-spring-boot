import React from 'react';
import { observer } from 'mobx-react-lite';
import Auth from '../pages/auth/auth';
import Main from '../pages/main/main';

const AuthMainRouter = observer(({ authStore }) => {
  return authStore.isLoggedIn ? <Main /> : <Auth />;
});

export default AuthMainRouter;
