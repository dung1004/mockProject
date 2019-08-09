import { put, takeEvery } from 'redux-saga/effects';

import { FETCH_CLASS } from './constants';
import { fetchClassSuccess } from './actions';
import callApi from '../../utils/apiCaller';
import { showLoading, hideLoading } from '../GlobalLoading/actions';

export function* getDataUser() {
  //   const teacher = yield callApi('teacher', 'get', null).then(res => [
  //     ...res.data,
  //   ]);
  //   const students = yield callApi('students', 'get', null).then(res => [
  //     ...res.data,
  //   ]);
  try {
    yield put(showLoading());
    const classes = yield callApi('class', 'get', null).then(res => [
      ...res.data,
    ]);
    const students = yield callApi('students', 'get', null).then(res => [
      ...res.data,
    ]);
    const token = JSON.parse(localStorage.getItem('token'));
    const data = [];
    const user = [];
    yield put(hideLoading());
    if (token) {
      switch (token.level) {
        case 0:
          yield put(fetchClassSuccess(classes));
          break;
        case 1:
          classes.forEach(element => {
            element.teacherId.filter(id =>
              id === token.id ? data.push(element) : null,
            );
          });
          yield put(fetchClassSuccess(data));
          break;
        case 2:
          students.filter(item =>
            item.email === token.mail ? user.push(item) : null,
          );
          classes.forEach(item => {
            user[0].classId.filter(id =>
              item.id === id ? data.push(item) : null,
            );
          });
          yield put(fetchClassSuccess(data));
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
