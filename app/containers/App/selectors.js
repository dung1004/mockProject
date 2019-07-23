import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectRouter = state => state.router;
const selectEmail = state => state.app || initialState;

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );
export { makeSelectLocation, selectEmail };
