/* eslint-disable no-param-reassign */
import * as type from './constants';

export const initialState = {};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.LOGIN_REQUEST:
      state = { ...action, submit: true };
      return { ...state };
    case type.LOGIN_SUCCESS:
      state = { ...state, isLoggedIn: true, level: action.level };
      localStorage.setItem(
        'token',
        JSON.stringify({ email: state.email, level: state.level }),
      );
      return { ...state };
    case type.LOGIN_FAILURE:
      state = { err: action.err };
      return { ...state };
    default:
      return { ...state };
  }
};

export default loginReducer;
