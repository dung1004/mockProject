import { put, takeEvery } from 'redux-saga/effects';

import { FETCH_DATA } from './constants';
import { fetchDataSuccess } from './actions';
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

  const allData = {
    teacher,
    students,
    classes,
    staffs,
    // account_login,
  };
  yield put(fetchDataSuccess(allData));
}

export default function* sagaWatcher() {
  yield takeEvery(FETCH_DATA, getDataUser);
}
