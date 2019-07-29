import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLog = state => state.login || initialState;

const makeSelectUsers = () =>
  createSelector(
    selectLog,
    loginState => loginState.email,
  );
const makeSelectPassword = () =>
  createSelector(
    selectLog,
    loginState => loginState.password,
  );
const makeSelectErr = () =>
  createSelector(
    selectLog,
    loginState => loginState.err,
  );
const makeSelectLogged = () =>
  createSelector(
    selectLog,
    loginState => loginState.isLoggedIn,
  );
export {
  selectLog,
  makeSelectUsers,
  makeSelectPassword,
  makeSelectErr,
  makeSelectLogged,
};
