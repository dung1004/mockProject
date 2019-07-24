import * as type from './constants';

export function fetchUser() {
  return {
    type: type.FETCH_USER,
  };
}

export function fetchUserSuccess(user) {
  return {
    type: type.FETCH_USER_SUCCESS,
    user,
  };
}
