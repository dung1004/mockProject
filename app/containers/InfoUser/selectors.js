import { createSelector } from 'reselect';
import initialState from './reducers';

const selectData = state => state.info || initialState;

const makeSelectStudent = () =>
  createSelector(
    selectData,
    classState => classState.students,
  );

const makeSelectTeacher = () =>
  createSelector(
    selectData,
    classState => classState.teachers,
  );

export { makeSelectStudent, makeSelectTeacher };
