import { takeEvery, put, select } from 'redux-saga/effects';
import { GET_DATA } from './constants';
import callApi from '../../utils/apiCaller';
import { getDataSuccess, getKeyFilter } from './actions';
import { makeSelectKey } from './selectors';

function switchCase(keySelect, dataSt, dataTc, dataSf) {
  switch (keySelect) {
    case 'student':
      return [...dataSt];
    case 'teacher':
      return [...dataTc];
    case 'staff':
      return [...dataSf];
    default:
      return [];
  }
}

function getPois(arr) {
  const posi = [];
  const sex = [];
  arr.forEach(element => {
    if (element.position) {
      posi.push(element.position);
    }
    sex.push(element.gender);
  });
  if (posi.length > 0) {
    return posi;
  }
  return sex;
}

function filterData(arr, keySearch) {
  return arr.filter(
    item =>
      item.firstName.toLowerCase().indexOf(keySearch.toLowerCase()) > -1 ||
      item.email.toLowerCase().indexOf(keySearch.toLowerCase()) > -1 ||
      item.lastName.toLowerCase().indexOf(keySearch.toLowerCase()) > -1,
  );
}

export function* getDataForm() {
  try {
    const teacher = yield callApi('teacher', 'get', null).then(res => [
      ...res.data,
    ]);
    const students = yield callApi('students', 'get', null).then(res => [
      ...res.data,
    ]);
    const staffs = yield callApi('staff', 'get', null).then(res => [
      ...res.data,
    ]);

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
        const sortData = yield switchCase(
          key.select,
          dataStudent,
          dataTeacher,
          dataStaff,
        );
        const filUser = yield filterData(sortData, key.search);
        const User = filUser.filter(item => item[filter] === value);
        const userPoi = yield getPois(filUser);
        yield put(getKeyFilter(userPoi));
        if (User && User.length > 0) {
          yield put(getDataSuccess(User));
        } else {
          yield put(getDataSuccess(filUser));
        }
      } else {
        const filUser = yield filterData(data, key.search);
        yield put(getDataSuccess(filUser));
      }
    } else if (key.select && key.select !== '') {
      const sortData = yield switchCase(
        key.select,
        dataStudent,
        dataTeacher,
        dataStaff,
      );
      const User = sortData.filter(item => item[filter] === value);
      const userPoi = yield getPois(sortData);
      yield put(getKeyFilter(userPoi));

      if (User && User.length > 0) {
        yield put(getDataSuccess(User));
      } else {
        yield put(getDataSuccess(sortData));
      }
    } else {
      yield put(getDataSuccess(data));
    }
    return null;
  } catch (error) {
    return error;
  }
}

export default function* sagaWatcher() {
  yield takeEvery(GET_DATA, getDataForm);
}
