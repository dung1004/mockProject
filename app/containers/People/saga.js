import { takeLatest, put } from 'redux-saga/effects';
import { GET_DATA } from './constants';
import callApi from '../../utils/apiCaller';
import { getDataSuccess, getDataFail } from './actions';

// // lay data theo key
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

// // lay ten truong can filter
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

// // filter data
// function filterData(arr, keySearch) {
//   return arr.filter(
//     item =>
//       `${item.firstName} ${item.lastName}`
//         .trim()
//         .toLowerCase()
//         .includes(keySearch.trim().toLowerCase()) ||
//       item.email
//         .trim()
//         .toLowerCase()
//         .includes(keySearch.trim().toLowerCase()),
//   );
// }

export function* getDataForm() {
  try {
    const teachers = yield callApi('teacher', 'get', null).then(res => [
      ...res.data,
    ]);
    const students = yield callApi('students', 'get', null).then(res => [
      ...res.data,
    ]);
    const staffs = yield callApi('staff', 'get', null).then(res => [
      ...res.data,
    ]);
    const allData = {
      teachers,
      students,
      staffs,
    };
    yield put(getDataSuccess(allData));
    // const dataStaff = [...allData.staffs];
    // const dataStudent = [...allData.students];
    // const dataTeacher = [...allData.teacher];
    // const key = yield select(makeSelectKey());
    // let filter = '';
    // let value = '';
    // if (key.student && key.student !== '') {
    //   filter = 'gender';
    //   value = key.student;
    // } // kiem tra key va tra ve truong va gia tri
    // if (key.teacher && key.teacher !== '') {
    //   filter = 'gender';
    //   value = key.teacher;
    // }
    // if (key.staff && key.staff !== '') {
    //   filter = 'position';
    //   value = key.staff;
    // }

    // // kiem tra cac key va tra ve ket qua
    // if (key.search && key.search !== '') {
    //   if (key.select && key.select !== '') {
    //     const sortData = yield switchCase(
    //       key.select,
    //       dataStudent,
    //       dataTeacher,
    //       dataStaff,
    //     );
    //     const filUser = yield filterData(sortData, key.search);
    //     const User = filUser.filter(item => item[filter] === value);
    //     const userPoi = yield getPois(filUser);
    //     yield put(getKeyFilter(userPoi));
    //     if (User && User.length > 0) {
    //       yield put(getDataSuccess(User));
    //     } else {
    //       yield put(getDataSuccess(filUser));
    //     }
    //   } else {
    //     const filUser = yield filterData(data, key.search);
    //     yield put(getDataSuccess(filUser));
    //   }
    // } else if (key.select && key.select !== '') {
    //   const sortData = yield switchCase(
    //     key.select,
    //     dataStudent,
    //     dataTeacher,
    //     dataStaff,
    //   );
    //   const User = sortData.filter(item => item[filter] === value);
    //   const userPoi = yield getPois(sortData);
    //   yield put(getKeyFilter(userPoi));

    //   if (User && User.length > 0) {
    //     yield put(getDataSuccess(User));
    //   } else {
    //     yield put(getDataSuccess(sortData));
    //   }
    // } else {
    //   yield put(getDataSuccess(data));
    // }
    // return null;
  } catch (error) {
    yield put(getDataFail(error));
  }
}

export default function* sagaWatcher() {
  yield takeLatest(GET_DATA, getDataForm);
}
