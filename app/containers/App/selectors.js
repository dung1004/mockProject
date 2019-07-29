/* eslint-disable import/no-unresolved */
import { createSelector } from 'reselect';
import initialState from './reducers';
// const selectAllData = state => state.nhanvien || initialState;

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

// eslint-disable-next-line prettier/prettier
export { makeSelectLocation, makeSelectUser, selectData };
