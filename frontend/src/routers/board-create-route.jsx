// import React, { useState, useEffect } from 'react';
// import { toJS } from 'mobx';
// import { makeStyles, Container } from '@material-ui/core';
// import useUser from '../../hooks/useUser';
// import useBoardCreate from '../../hooks/useBoardCreate';
// import { observer } from 'mobx-react-lite';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: theme.spacing(3),
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
// }));

// const boardCreateRoute = observer(({ children, ...rest }) => {
//   const boardCreate = useBoardCreate();
//   const user = useUser();
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     const classes = useStyles();
//     boardCreate.setNickname(toJS(user.user).nickname);
//     boardCreate.setDefaultTitle();
//   }, []);

//   if (loading) {
//     return (
//       <Loading />
//     )
//   } else if
// });

// export default boardCreateRoute;
