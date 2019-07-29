import { put, takeEvery } from 'redux-saga/effects';

import { FETCH_USER, FETCH_DATA } from './constants';
import { fetchUserSuccess, fetchDataSuccess } from './actions';
import callApi from '../../utils/apiCaller';

export function* getDataUser() {
  const teacher = yield callApi('teacher', 'get', null).then(res => [
    ...res.data,
  ]);
  const students = yield callApi('students', 'get', null).then(res => [
    ...res.data,
  ]);
  const classes = yield callApi('class', 'get', null).then(res => [
    ...res.data,
  ]);
  const staffs = yield callApi('staff', 'get', null).then(res => [...res.data]);
  // const account_login = yield callApi('account_login', 'get', null).then(
  //   res => [...res.data],
  // );
  const allData = {
    teacher,
    students,
    classes,
    staffs,
    // account_login,
  };
  yield put(fetchDataSuccess(allData));
}

export function* getUser() {
  if (JSON.parse(localStorage.getItem('token'))) {
    const user = yield JSON.parse(localStorage.getItem('token'));
    return yield put(fetchUserSuccess(user));
  }
  return yield put(fetchUserSuccess(null));
}

export default function* sagaWatcher() {
  yield takeEvery(FETCH_USER, getUser);
  yield takeEvery(FETCH_DATA, getDataUser);
}
