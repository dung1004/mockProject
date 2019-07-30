import * as type from './constants';

export function getSearch(key) {
  return {
    type: type.GET_SEARCH,
    key,
  };
}

export function getSearchSuccess(values) {
  return {
    type: type.GET_SEARCH_SUCCESS,
    values,
  };
}
