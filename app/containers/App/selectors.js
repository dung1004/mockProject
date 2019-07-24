// import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectHome = state => state.app || initialState;
const changeState = state => state.nhanvien || initialState;

export { selectHome, changeState };
