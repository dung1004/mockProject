import { createSelector } from 'reselect';
import initialState from './reducers';

const selectUser = state => state.detpage || initialState;

const makeSelectUser = () =>
  createSelector(
    selectUser,
    userState => userState.user,
  );

export { makeSelectUser };
