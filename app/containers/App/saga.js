/* eslint-disable consistent-return */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-vars */
import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_USER } from './constants';
import { fetchUserSuccess } from './actions';

export function* getUser() {
  if (JSON.parse(localStorage.getItem('token'))) {
    var user = yield JSON.parse(localStorage.getItem('token'));
    return yield put(fetchUserSuccess(user));
  }
  return yield put(fetchUserSuccess(null));
}

export default function* sagaWatcher() {
  yield takeLatest(FETCH_USER, getUser);
}
