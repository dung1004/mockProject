import { createSelector } from 'reselect';
import initialState from './reducers';

const selectRouter = state => state.router;
const selectUser = state => state.app || initialState;
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

export { makeSelectLocation, makeSelectLevel, selectUser };
