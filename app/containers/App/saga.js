/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-const-assign */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { put, takeLatest } from 'redux-saga/effects';

import { FETCH_DATA, FETCH_DATA_SUCCESS } from './constants';
import callApi from '../../utils/apiCaller';
import { fetchDataSuccess } from './actions';

export function* getData() {
  
  const teacher = yield callApi('teacher', 'get', null).then(res => [...res.data]);
  const students = yield callApi('students', 'get', null).then(res => [...res.data]);
  const classes = yield callApi('class', 'get', null).then(res => [...res.data]);
  const staffs = yield callApi('staff', 'get', null).then(res => [...res.data]);
  let allData = {
    teacher,
    students,
    classes,
    staffs
  };

  yield put(fetchDataSuccess(allData));


}

export default function* sagaWatcher() {
  yield takeLatest(FETCH_DATA, getData);
}
