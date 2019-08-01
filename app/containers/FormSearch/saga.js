import { takeEvery, put, select } from 'redux-saga/effects';
import { GET_DATA } from './constants';
import callApi from '../../utils/apiCaller';
import { getDataSuccess } from './actions';
import { makeSelectKey } from './selectors';

export function* getDataForm() {
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
  const dataStaff = [...allData.staffs];
  const dataStudent = [...allData.students];
  const dataTeacher = [...allData.teacher];
  const key = yield select(makeSelectKey());
  if (key.search !== '' && key.select !== '' && key.select) {
    let sortData = [];
    switch (key.select) {
      case 'student':
        sortData = [...dataStudent];
        break;
      case 'teacher':
        sortData = [...dataTeacher];
        break;
      case 'staff':
        sortData = [...dataStaff];
        break;
      default:
        return null;
    }
    const filUser = sortData.filter(
      item =>
        `${item.firstName} ${item.lastName}`
          .toLowerCase()
          .indexOf(key.search.toLowerCase()) > -1 ||
        item.email.toLowerCase().indexOf(key.search.toLowerCase()) > -1,
    );
    yield put(getDataSuccess(filUser));
  } else if (key.search !== '' && key.select === '') {
    // console.log('chi sea');
    const filUser = data.filter(
      item =>
        `${item.firstName} ${item.lastName}`
          .toLowerCase()
          .indexOf(key.search.toLowerCase()) > -1 ||
        item.email.toLowerCase().indexOf(key.search.toLowerCase()) > -1,
    );
    yield put(getDataSuccess(filUser));
  } else if (key.select !== '' && key.search === '' && key.select) {
    let sortData = [];
    switch (key.select) {
      case 'student':
        sortData = [...dataStudent];
        break;
      case 'teacher':
        sortData = [...dataTeacher];
        break;
      case 'staff':
        sortData = [...dataStaff];
        break;
      default:
        return null;
    }
    yield put(getDataSuccess(sortData));
  } else {
    yield put(getDataSuccess(data));
  }
  return null;
}

export default function* sagaWatcher() {
  yield takeEvery(GET_DATA, getDataForm);
}
