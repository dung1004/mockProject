import { createSelector } from 'reselect';

const selectRouter = state => state.router;
const getUser = state => state.data;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export { getUser, makeSelectLocation };

// const makeGetData = () =>
//   createSelector(
//     getUser,
//     userState => userState.data,
//   );
