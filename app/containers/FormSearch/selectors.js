import { createSelector } from 'reselect';
import initialState from './reducers';

const selectKeword = state => state.form || initialState;

const makeKeyWord = () =>
  createSelector(
    selectKeword,
    loginState => loginState.key,
  );

export { makeKeyWord };
