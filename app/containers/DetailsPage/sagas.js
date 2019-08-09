import { put, takeEvery, select } from 'redux-saga/effects';

import { FETCH_USER } from './constants';
import { fetchUserSuccess } from './actions';
import callApi from '../../utils/apiCaller';
import { makeSelectLocation } from '../App/selectors';
import { showLoading, hideLoading } from '../GlobalLoading/actions';

export function* getDataUser() {
  yield put(showLoading());
  const teacher = yield callApi('teacher', 'get', null).then(res => [
    ...res.data,
  ]);
  const students = yield callApi('students', 'get', null).then(res => [
    ...res.data,
  ]);
  const staffs = yield callApi('staff', 'get', null).then(res => [...res.data]);
  const allData = [...teacher, ...students, ...staffs];
  if (allData) {
    const path = yield select(makeSelectLocation());
    const id = yield path.pathname.slice(11);
    const user = yield allData.filter(item => item.id === id);
    yield put(fetchUserSuccess(user));
  }
  yield put(hideLoading());
}

export default function* sagaWatcher() {
  yield takeEvery(FETCH_USER, getDataUser);
}
