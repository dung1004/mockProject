import { createSelector } from 'reselect';
import initialState from './reducers';

const selectData = state => state.form || initialState;

const makeSelectData = () =>
  createSelector(
    selectData,
    datalState => datalState.data,
  );
const makeSelectKey = () =>
  createSelector(
    selectData,
    datalState => datalState.key,
  );
export { makeSelectData, makeSelectKey };
