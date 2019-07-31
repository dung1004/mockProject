// import { takeLatest, select, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';
import { GET_SEARCH } from './constants';
// import { makeKeyWord } from './selectors';
// import { getSearchSuccess } from './actions';
// import callApi from '../../utils/apiCaller';

export function* getKey() {
  // const teacher = yield callApi('teacher', 'get', null).then(res => [
  //   ...res.data,
  // ]);
  // const students = yield callApi('students', 'get', null).then(res => [
  //   ...res.data,
  // ]);
  // // const classes = yield callApi('class', 'get', null).then(res => [
  // //   ...res.data,
  // // ]);
  // const staffs = yield callApi('staff', 'get', null).then(res => [...res.data]);
  // const allData = {
  //   teacher,
  //   students,
  //   staffs,
  //   // account_login,
  // };
  // console.log(allData);
  // const key = yield select(makeKeyWord());
  // const data = yield Object.assign({}, allData);
  // const { students } = data;
  // const { teacher } = data;
  // const { staffs } = data;
  // let listData;
  // yield students && teacher && staffs
  //   ? yield (listData = students.concat(teacher, staffs))
  //   : null;
  // console.log(listData);
  // yield put(getSearchSuccess(listData));
  // let getDataSeach = [];
  // if (key.search !== '') {
  //   // const filClass = data.classes.filter(
  //   //   item => item.name.toLowerCase().indexOf(key.search.toLowerCase()) > -1,
  //   // );
  //   const filStudent = data.students.filter(
  //     item =>
  //       `${item.firstName} ${item.lastName}`
  //         .toLowerCase()
  //         .indexOf(key.search.toLowerCase()) > -1,
  //   );
  //   const filTeacher = data.teacher.filter(
  //     item =>
  //       `${item.firstName} ${item.lastName}`
  //         .toLowerCase()
  //         .indexOf(key.search.toLowerCase()) > -1,
  //   );
  //   const filStaff = data.staffs.filter(
  //     item =>
  //       `${item.firstName} ${item.lastName}`
  //         .toLowerCase()
  //         .indexOf(key.search.toLowerCase()) > -1,
  //   );
  //   // yield filClass.length > 0
  //   //   ? (getDataSeach = [...getDataSeach, ...filClass])
  //   //   : null;
  //   yield filStudent.length > 0
  //     ? (getDataSeach = [...getDataSeach, ...filStudent])
  //     : null;
  //   yield filTeacher.length > 0
  //     ? (getDataSeach = [...getDataSeach, ...filTeacher])
  //     : null;
  //   yield filStaff.length > 0
  //     ? (getDataSeach = [...getDataSeach, ...filStaff])
  //     : null;
  //   yield put(getSearchSuccess(getDataSeach));
  // } else {
  //   // yield put(getSearchSuccess(listData));
  //   console.log('aasd');
  // }
}

export default function* sagaWatcher() {
  yield takeLatest(GET_SEARCH, getKey);
}
