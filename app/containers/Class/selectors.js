import { createSelector } from 'reselect';
import initialState from './reducers';

const selectData = state => state.class || initialState;

const makeSelectClass = () =>
  createSelector(
    selectData,
    classState => classState.dataClass,
  );

export { makeSelectClass };
