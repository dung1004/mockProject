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
    default:
      return { ...state };
  }
};

export default appReducer;
