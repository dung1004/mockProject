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
export function fetchData() {
  return {
    type: type.FETCH_DATA,
  };
}

export function fetchDataSuccess(allData) {
  return {
    type: type.FETCH_DATA_SUCCESS,
    allData,
  };
}
