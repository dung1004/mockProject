import { put, takeEvery, select, takeLatest } from 'redux-saga/effects';

import { FETCH_USER, CALCEL_EDIT, EDIT } from './constants';
import { fetchUserSuccess, editSuccess } from './actions';
import callApi from '../../utils/apiCaller';
import { makeSelectLocation } from '../App/selectors';
import { makeSelectUser } from './selectors';

const datas = { constData: [] };

function* getDataUser() {
  const teacher = yield callApi('teacher', 'get', null).then(res => [
    ...res.data,
  ]);
  const students = yield callApi('students', 'get', null).then(res => [
    ...res.data,
  ]);
  const staffs = yield callApi('staff', 'get', null).then(res => [...res.data]);
  const allClass = yield callApi('class', 'get', null).then(res => [
    ...res.data,
  ]);
  const allData = [...teacher, ...students, ...staffs];
  // console.log(allClass);

  if (allData) {
    const path = yield select(makeSelectLocation());
    const id = yield path.pathname.slice(11);
    // lay thong tin cua 1 user
    const user = yield allData.filter(item => item.id === id);
    // lay tat ca cac lop dang day cua 1 gv
    const classes = [];
    yield allClass.forEach(item => {
      item.teacherId.filter(itemClass =>
        itemClass === id ? classes.push(item) : null,
      );
    });
    // lay tat ca lop hoc cua 1 hv
    const idClass = [];
    if (user[0] && user[0].classId) {
      user[0].classId.forEach(emtai => {
        allClass.filter(value =>
          emtai === value.id ? idClass.push(value) : null,
        );
      });
    }

    const data = { ...user[0], classes, idClass };
    // console.log(idClass);
    // console.log(data);

    yield put(fetchUserSuccess(data));
    yield (datas.constData = data);
  }

  // ======= code cua a thuần để đó a thuần xử lý
  //   const path = allData ? yield select(makeSelectLocation()) : null;
  //   const id = allData ? yield path.pathname.slice(11) : null;
  //   const user = allData ? yield allData.filter(item => item.id === id) : null;
  //   const data = allData ? { ...user[0], class, idClass } : null;
  //   yield put(fetchUserSuccess(data));
  // >>>>>>> remotes/origin/class/index
}

function* editUser(payload) {
  const dataCon = yield select(makeSelectUser());
  const user = {};
  const data = Object.keys(payload.user);
  data.forEach(item => {
    if (payload.user[item] !== '') {
      user[item] = payload.user[item];
    }
  });
  yield put(editSuccess(dataCon));
  yield put(fetchUserSuccess(user));
}

function* calcelEditUser() {
  yield put(fetchUserSuccess(datas.constData));
}

export default function* sagaWatcher() {
  yield takeLatest(FETCH_USER, getDataUser);
  yield takeEvery(EDIT, editUser);
  yield takeEvery(CALCEL_EDIT, calcelEditUser);
}
