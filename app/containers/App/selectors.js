import { createSelector } from 'reselect';
import initialState from './reducers';

const selectRouter = state => state.router;

const selectData = state => state.app || initialState;
// const selectDataUser = state => state.app || initialState;
const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );
const makeSelectUser = () =>
  createSelector(
    selectData,
    levelState => levelState.user,
  );

// const selectData = () =>
//   createSelector(
//     data,
//     levelState => levelState.data,
//   );

export { makeSelectLocation, makeSelectUser, selectData };
