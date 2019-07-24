/* eslint-disable no-const-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
import { put, takeLatest, select } from 'redux-saga/effects';

import * as type from './constants';
import callApi from '../../utils/apiCaller';
import { loginSuccess, loginFailure } from './actions';
import { makeSelectUsers, makeSelectPassword } from './selectors';
import { fetchUser } from '../App/actions';

export function* login() {
  const datas = yield callApi('account_login', 'get', null).then(res => [
    ...res.data,
  ]);
  const emailUser = yield select(makeSelectUsers());
  const passwordUser = yield select(makeSelectPassword());
  let user = {};
  yield datas.forEach(element => {
    if (element.email === emailUser) user = { ...element };
  });
  // if (Object.keys(user).length) {
  //   yield user.password === passwordUser
  //     ? put(loginSuccess(user.level))
  //     : put(loginFailure('Password không đúng'));
  // } else {
  //   yield put(loginFailure('Email không tồn tại'));
  // }
  // yield put(fetchUser());
  if (Object.keys(user).length) {
    if (user.password === passwordUser) {
      yield put(loginSuccess(user.level));
      yield put(fetchUser());
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
