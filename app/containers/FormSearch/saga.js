import { takeEvery, put, select } from 'redux-saga/effects';
import { GET_DATA } from './constants';
import callApi from '../../utils/apiCaller';
import { getDataSuccess } from './actions';
import { makeSelectKey } from './selectors';

export function* getKey() {
  const teacher = yield callApi('teacher', 'get', null).then(res => [
    ...res.data,
  ]);
  const students = yield callApi('students', 'get', null).then(res => [
    ...res.data,
  ]);
  // const classes = yield callApi('class', 'get', null).then(res => [
  //   ...res.data,
  // ]);
  const staffs = yield callApi('staff', 'get', null).then(res => [...res.data]);

  const allData = {
    teacher,
    students,
    staffs,
  };
  const data = [...allData.staffs, ...allData.students, ...allData.teacher];
  const key = yield select(makeSelectKey());
  if (key.search !== '') {
    const filUser = data.filter(
      item =>
        `${item.firstName} ${item.lastName}`
          .toLowerCase()
          .indexOf(key.search.toLowerCase()) > -1 ||
        item.email.toLowerCase().indexOf(key.search.toLowerCase()) > -1,
    );
    yield put(getDataSuccess(filUser));
  } else {
    yield put(getDataSuccess(data));
  }
}

export default function* sagaWatcher() {
  yield takeEvery(GET_DATA, getKey);
}
