import * as type from './constants';

export function getData() {
  return {
    type: type.GET_DATA,
  };
}

export function getDataSuccess(students, teachers) {
  return {
    type: type.GET_DATA_SUCCESS,
    students,
    teachers,
  };
}
