/* eslint-disable import/no-unresolved */
import { createSelector } from 'reselect';
import initialState from './reducers';
// const selectAllData = state => state.nhanvien || initialState;

const selectRouter = state => state.router;
const selectUser = state => state.app || initialState;
// const selectDataUser = state => state.app || initialState;
const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );
const makeSelectLevel = () =>
  createSelector(
    selectUser,
    levelState => levelState.level,
  );

// eslint-disable-next-line prettier/prettier
export { makeSelectLocation, makeSelectLevel, selectUser };
