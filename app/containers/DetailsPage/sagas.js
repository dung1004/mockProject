import { put, takeEvery, select, takeLatest } from 'redux-saga/effects';

import { FETCH_USER, CALCEL_EDIT, EDIT } from './constants';
import { fetchUserSuccess, editSuccess } from './actions';
import callApi from '../../utils/apiCaller';
import { makeSelectLocation } from '../App/selectors';
import { makeSelectUser, selectUserCst } from './selectors';

function* getDataUser() {
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
    const data = { ...user[0] };
    yield put(fetchUserSuccess(data));
  }
}

function* editUser(payload) {
  const dataCon = yield select(makeSelectUser());
  const user = {};
  const data = Object.keys(payload.user);
  data.forEach(item => {
    if (payload.user[item] !== '') {
      user[item] = payload.user[item];
    }
  });
  yield put(editSuccess(dataCon));
  yield put(fetchUserSuccess(user));
}

function* calcelEditUser() {
  const data = yield select(selectUserCst());
  yield put(fetchUserSuccess(data));
}

export default function* sagaWatcher() {
  yield takeLatest(FETCH_USER, getDataUser);
  yield takeEvery(EDIT, editUser);
  yield takeEvery(CALCEL_EDIT, calcelEditUser);
}
