import { put, takeEvery } from 'redux-saga/effects';

import { FETCH_CLASS } from './constants';
import { fetchClassSuccess } from './actions';
import callApi from '../../utils/apiCaller';

export function* getDataUser() {
  //   const teacher = yield callApi('teacher', 'get', null).then(res => [
  //     ...res.data,
  //   ]);
  //   const students = yield callApi('students', 'get', null).then(res => [
  //     ...res.data,
  //   ]);
  try {
    const classes = yield callApi('class', 'get', null).then(res => [
      ...res.data,
    ]);
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      switch (token.level) {
        case 0:
          yield put(fetchClassSuccess(classes));
          break;
        case 1:
          break;
        case 2:
          break;
        default:
          break;
      }
    }
  } catch (error) {
    return error;
  }
  return null;
  // const staffs = yield callApi('staff', 'get', null).then(res => [...res.data]);
}

export default function* sagaWatcher() {
  yield takeEvery(FETCH_CLASS, getDataUser);
}
