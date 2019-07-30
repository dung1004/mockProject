/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-vars */
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// import { FETCH_USER, FETCH_DATA } from './constants';
// import { fetchUserSuccess, fetchDataSuccess } from './actions';
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

// export function* getUser() {
//   if (JSON.parse(localStorage.getItem('token'))) {
//     var dataUser = yield JSON.parse(localStorage.getItem('token'));
//     if (dataUser.level === 0) {
//       const staffs = yield callApi('staff', 'get', null).then(res => [
//         ...res.data,
//       ]);
//       const users = staffs.filter(value =>
//         value.email === dataUser.email ? value : null,
//       );
//       const user = { ...users[0] };
//       return yield put(fetchUserSuccess(user));
//     }
//     if (dataUser.level === 1) {
//       const teacher = yield callApi('teacher', 'get', null).then(res => [
//         ...res.data,
//       ]);
//       const users = teacher.filter(value =>
//         value.email === dataUser.email ? value : null,
//       );
//       const user = { ...users[0] };
//       return yield put(fetchUserSuccess(user));
//     }
//     if (ataUser.level === 2) {
//       const students = yield callApi('students', 'get', null).then(res => [
//         ...res.data,
//       ]);
//       const users = students.filter(value =>
//         value.email === dataUser.email ? value : null,
//       );
//       const user = { ...users[0] };
//       return yield put(fetchUserSuccess(user));
//     }
//   }
// }

export default function* sagaWatcher() {
  // yield takeLatest(FETCH_USER, getUser);
  yield takeEvery(FETCH_DATA, getDataUser);
}
