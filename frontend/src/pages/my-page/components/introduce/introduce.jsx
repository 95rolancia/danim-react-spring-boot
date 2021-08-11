import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import useUser from '../../../../hooks/useUser';

const Introduce = observer(() => {
  const user = useUser();
  return <h1>{toJS(user.user).introduce}</h1>;
});

export default Introduce;
