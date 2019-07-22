/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
import { put, takeLatest, select } from 'redux-saga/effects';

import * as type from './constants';
import callApi from '../../utils/apiCaller';
import { loginSuccess } from './actions';
import { fetchDataSuccess } from '../App/actions';
import { initialState } from './reducer';

export function* login() {
  const datas = yield callApi('users', 'get', null).then(res => [...res.data]);
  yield put(fetchDataSuccess(datas));
  const emails = yield datas.map(data => data.email);
  const email = yield emails.filter(e => e === initialState.email);
  yield email ? put(loginSuccess()) : '';
}

export default function* sagaWatcher() {
  yield takeLatest(type.LOGIN_REQUEST, login);
}
