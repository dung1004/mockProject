import { takeEvery, put, select } from 'redux-saga/effects';
import { GET_DATA } from './constants';
import callApi from '../../utils/apiCaller';
import { getDataSuccess, getKeyFilter } from './actions';
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
  let filter = '';
  let value = '';
  if (key.student && key.student !== '') {
    filter = 'gender';
    value = key.student;
  }
  if (key.teacher && key.teacher !== '') {
    filter = 'gender';
    value = key.teacher;
  }
  if (key.staff && key.staff !== '') {
    filter = 'position';
    value = key.staff;
  }
  if (key.search && key.search !== '') {
    if (key.select && key.select !== '') {
      let sortData = [];
      const posi = [];
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
      const filUser = yield sortData.filter(
        item =>
          item.firstName.toLowerCase().indexOf(key.search.toLowerCase()) > -1 ||
          item.email.toLowerCase().indexOf(key.search.toLowerCase()) > -1 ||
          item.lastName.toLowerCase().indexOf(key.search.toLowerCase()) > -1,
      );
      yield filUser.forEach(element => {
        if (element.position) {
          posi.push(element.position);
        } else {
          posi.push(element.gender);
        }
      });
      const User = filUser.filter(item => item[filter] === value);
      yield put(getKeyFilter(posi));
      if (User && User.length > 0) {
        yield put(getDataSuccess(User));
      } else {
        yield put(getDataSuccess(filUser));
      }
    } else {
      const filUser = data.filter(
        item =>
          item.firstName.toLowerCase().indexOf(key.search.toLowerCase()) > -1 ||
          item.email.toLowerCase().indexOf(key.search.toLowerCase()) > -1 ||
          item.lastName.toLowerCase().indexOf(key.search.toLowerCase()) > -1,
      );
      yield put(getDataSuccess(filUser));
    }
  } else if (key.select && key.select !== '') {
    let sortData = [];
    const posi = [];
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
    yield sortData.forEach(element => {
      if (element.position) {
        posi.push(element.position);
      } else {
        posi.push(element.gender);
      }
    });
    const User = sortData.filter(item => item[filter] === value);
    yield put(getKeyFilter(posi));
    if (User && User.length > 0) {
      yield put(getDataSuccess(User));
    } else {
      yield put(getDataSuccess(sortData));
    }
  } else {
    yield put(getDataSuccess(data));
  }
  return null;
}

export default function* sagaWatcher() {
  yield takeEvery(GET_DATA, getDataForm);
}
