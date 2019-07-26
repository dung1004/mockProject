/* eslint-disable no-param-reassign */
import * as type from './constants';

export const initialState = {};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_USER:
      state = { ...state };
      return { ...state };
    case type.FETCH_USER_SUCCESS:
      state = { ...action.user };
      return { ...state };
    case type.FETCH_DATA:
      return { ...state };
    case type.FETCH_DATA_SUCCESS:
      state = { ...action.allData };
      return { ...state };
    default:
      return { ...state };
  }
};

export default appReducer;
