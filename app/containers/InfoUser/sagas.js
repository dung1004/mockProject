import { put, takeEvery, select } from 'redux-saga/effects';

import { GET_DATA } from './constants';
import { getDataSuccess } from './actions';
import callApi from '../../utils/apiCaller';
import { makeSelectLocation } from '../App/selectors';

export function* getDataInfo() {
  try {
    const classes = yield callApi('class', 'get', null).then(res => [
      ...res.data,
    ]);
    const students = yield callApi('students', 'get', null).then(res => [
      ...res.data,
    ]);
    const teachers = yield callApi('teacher', 'get', null).then(res => [
      ...res.data,
    ]);
    const token = JSON.parse(localStorage.getItem('token'));
    const path = yield select(makeSelectLocation());
    const id = yield path.pathname.slice(12);
    const getTeacher = [];
    const getClass = [];
    const getStudent = [];
    if (token) {
      switch (token.level) {
        case 0:
          classes.forEach(cla => (cla.id === id ? getClass.push(cla) : null));
          getClass[0].teacherId.forEach(tId => {
            teachers.filter(teacher =>
              teacher.id === tId ? getTeacher.push(teacher) : null,
            );
          });
          students.forEach(student => {
            student.classId.filter(classId =>
              classId === getClass[0].id ? getStudent.push(student) : null,
            );
          });
          yield put(getDataSuccess(getStudent, getTeacher));
          break;
        case 1:
          students.forEach(student => {
            student.classId.filter(classId =>
              classId === id ? getStudent.push(student) : null,
            );
          });
          yield put(getDataSuccess(getStudent, getTeacher));
          break;
        case 2:
          classes.forEach(cla => (cla.id === id ? getClass.push(cla) : null));
          getClass[0].teacherId.forEach(tId => {
            teachers.filter(teacher =>
              teacher.id === tId ? getTeacher.push(teacher) : null,
            );
          });
          yield put(getDataSuccess(getStudent, getTeacher));
          break;
        default:
          break;
      }
    }
  } catch (error) {
    return error;
  }
  return null;
}

export default function* sagaWatcher() {
  yield takeEvery(GET_DATA, getDataInfo);
}
