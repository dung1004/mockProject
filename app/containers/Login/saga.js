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
  yield data.forEach(element => {
    if (element.email === emailUser) user = { ...element };
  });
  if (Object.keys(user).length) {
    if (user.password === passwordUser) {
      yield put(loginSuccess(user.level));
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
