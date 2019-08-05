import * as type from './constants';

export function fetchClass() {
  return {
    type: type.FETCH_CLASS,
  };
}

export function fetchClassSuccess(data) {
  return {
    type: type.FETCH_CLASS_SUCCESS,
    data,
  };
}
