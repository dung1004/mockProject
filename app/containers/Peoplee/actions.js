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

export function getFilter(keyword) {
  return {
    type: type.GET_FILTER,
    keyword,
  };
}
export function getFilterSuccess(data) {
  return {
    type: type.GET_FILTER_SUCCESS,
    data,
  };
}

// export function getKeyFilter(item) {
//   return {
//     type: type.GET_KEY_FILTER,
//     item,
//   };
// }
