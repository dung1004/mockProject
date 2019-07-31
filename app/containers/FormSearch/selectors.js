import { createSelector } from 'reselect';
import initialState from './reducers';

const selectKeword = state => state.form || initialState;

const makeKeyWord = () =>
  createSelector(
    selectKeword,
    loginState => loginState.keyword,
  );
const dataSearch = () =>
  createSelector(
    selectKeword,
    loginState => loginState.data,
  );

export { makeKeyWord, dataSearch };
