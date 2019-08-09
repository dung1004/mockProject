import { takeLatest, put, select, delay, takeEvery } from 'redux-saga/effects';
import { GET_DATA, GET_FILTER } from './constants';
import callApi from '../../utils/apiCaller';
import { getDataSuccess, getFilterSuccess, getData } from './actions';
import { makeSelectData } from './selectors';
import { showLoading, hideLoading } from '../GlobalLoading/actions';

// function switchCase(keySelect, dataSt, dataTc, dataSf) {
//   switch (keySelect) {
//     case 'student':
//       return [...dataSt];
//     case 'teacher':
//       return [...dataTc];
//     case 'staff':
//       return [...dataSf];
//     default:
//       return [];
//   }
// }

// function getPois(arr) {
//   const posi = [];
//   const sex = [];
//   arr.forEach(element => {
//     if (element.position) {
//       posi.push(element.position);
//     }
//     sex.push(element.gender);
//   });
//   if (posi.length > 0) {
//     return posi;
//   }
//   return sex;
// }

// export function* getDataForm() {
//   yield delay(500);
//   try {
//     yield put(showLoading());
//     const teacher = yield callApi('teacher', 'get', null).then(res => [
//       ...res.data,
//     ]);
//     const students = yield callApi('students', 'get', null).then(res => [
//       ...res.data,
//     ]);
//     const staffs = yield callApi('staff', 'get', null).then(res => [
//       ...res.data,
//     ]);
//     yield put(hideLoading());
//     const allData = {
//       teacher,
//       students,
//       staffs,
//     };
//     const data = [...allData.staffs, ...allData.students, ...allData.teacher];
//     const dataStaff = [...allData.staffs];
//     const dataStudent = [...allData.students];
//     const dataTeacher = [...allData.teacher];
//     const key = yield select(makeSelectKey());
//     let filter = '';
//     let value = '';
//     if (key.student && key.student !== '') {
//       filter = 'gender';
//       value = key.student;
//     }
//     if (key.teacher && key.teacher !== '') {
//       filter = 'gender';
//       value = key.teacher;
//     }
//     if (key.staff && key.staff !== '') {
//       filter = 'position';
//       value = key.staff;
//     }
//     if (key.search && key.search !== '') {
//       if (key.select && key.select !== '') {
//         const sortData = yield switchCase(
//           key.select,
//           dataStudent,
//           dataTeacher,
//           dataStaff,
//         );
//         const filUser = yield filterData(sortData, key.search);
//         const User = filUser.filter(item => item[filter] === value);
//         const userPoi = yield getPois(filUser);
//         yield put(getKeyFilter(userPoi));
//         if (User && User.length > 0) {
//           yield put(getDataSuccess(User));
//         } else {
//           yield put(getDataSuccess(filUser));
//         }
//       } else {
//         const filUser = yield filterData(data, key.search);
//         yield put(getDataSuccess(filUser));
//       }
//     } else if (key.select && key.select !== '') {
//       const sortData = yield switchCase(
//         key.select,
//         dataStudent,
//         dataTeacher,
//         dataStaff,
//       );
//       const User = sortData.filter(item => item[filter] === value);
//       const userPoi = yield getPois(sortData);
//       yield put(getKeyFilter(userPoi));

//       if (User && User.length > 0) {
//         yield put(getDataSuccess(User));
//       } else {
//         yield put(getDataSuccess(sortData));
//       }
//     } else {
//       yield put(getDataSuccess(data));
//     }
//     return null;
//   } catch (error) {
//     return error;
//   }
// }
function filterData(arr, keySearch) {
  return arr.filter(
    item =>
      item.firstName
        .trim()
        .toLowerCase()
        .includes(keySearch.trim().toLowerCase()) ||
      item.email
        .trim()
        .toLowerCase()
        .includes(keySearch.trim().toLowerCase()) ||
      item.lastName
        .trim()
        .toLowerCase()
        .includes(keySearch.trim().toLowerCase()),
  );
}

function* getDataForm() {
  try {
    yield put(showLoading());
    const teacher = yield callApi('teacher', 'get', null).then(res => [
      ...res.data,
    ]);
    const students = yield callApi('students', 'get', null).then(res => [
      ...res.data,
    ]);
    const staffs = yield callApi('staff', 'get', null).then(res => [
      ...res.data,
    ]);
    const data = [...staffs, ...students, ...teacher];
    yield delay(1000);
    yield put(hideLoading());
    yield put(getDataSuccess(data));
  } catch (error) {
    return error;
  }
  return [];
}

function* getFilter(payload) {
  yield delay(500);
  const { keyword } = payload;
  const data = yield select(makeSelectData());
  const filterUser = filterData(data, keyword);
  yield put(getFilterSuccess(filterUser));
  if (!keyword) {
    yield put(getData());
  }
}

export default function* sagaWatcher() {
  yield takeEvery(GET_DATA, getDataForm);
  yield takeLatest(GET_FILTER, getFilter);
}
