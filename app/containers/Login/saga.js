import { put, takeLatest, select } from 'redux-saga/effects';

import * as type from './constants';
import callApi from '../../utils/apiCaller';
import { loginSuccess, loginFailure } from './actions';
import { makeSelectUsers, makeSelectPassword } from './selectors';

export function* login() {
  const data = yield callApi('accountLogin', 'get', null).then(res => [
    ...res.data,
  ]);
  const emailUser = yield select(makeSelectUsers());
  const passwordUser = yield select(makeSelectPassword());
  let user = {};
  yield data && typeof data === 'string' ? data : null;
  yield data.forEach(element => {
    if (element.email === emailUser) user = { ...element };
  });
  if (Object.keys(user).length) {
    if (user.password === passwordUser) {
      if (user.level === 0) {
        const staffs = yield callApi('staff', 'get', null).then(res => [
          ...res.data,
        ]);
        const users = staffs.filter(value =>
          value.email === user.email ? value : null,
        );
        const userInfo = { ...users[0], level: user.level };
        yield put(loginSuccess(userInfo));
      }
      if (user.level === 1) {
        const teacher = yield callApi('teacher', 'get', null).then(res => [
          ...res.data,
        ]);
        const users = teacher.filter(value =>
          value.email === user.email ? value : null,
        );
        const userInfo = { ...users[0], level: user.level };
        yield put(loginSuccess(userInfo));
      }
      if (user.level === 2) {
        const students = yield callApi('students', 'get', null).then(res => [
          ...res.data,
        ]);
        const users = students.filter(value =>
          value.email === user.email ? value : null,
        );
        const userInfo = { ...users[0], level: user.level };
        yield put(loginSuccess(userInfo));
      }
    } else {
      yield put(loginFailure('Password không đúng'));
    }
  } else {
    yield put(loginFailure('Email không tồn tại'));
  }
}

export default function* sagaWatcher() {
  yield takeLatest(type.LOGIN_REQUEST, login);
}
