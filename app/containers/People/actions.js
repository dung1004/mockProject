import * as type from './constants';

export function getData() {
  return {
    type: type.GET_DATA,
  };
}

export function getDataSuccess(values) {
  return {
    type: type.GET_DATA_SUCCESS,
    values,
  };
}

export function getKey(key) {
  return {
    type: type.GET_KEY,
    key,
  };
}

export function getKeyFilter(item) {
  return {
    type: type.GET_KEY_FILTER,
    item,
  };
}
