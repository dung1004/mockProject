import * as type from './constants';

export function fetchData() {
  return {
    type: type.FETCH_DATA,
  };
}
export function fetchDataSuccess(users) {
  return {
    type: type.FETCH_DATA_SUCCESS,
    users,
  };
}
