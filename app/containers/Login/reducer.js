/* eslint-disable no-param-reassign */
import * as type from './constants';

export const initialState = {};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.LOGIN_REQUEST:
      state = { ...action, submit: true };
      return { ...state };
    case type.LOGIN_SUCCESS:
      state = { ...state, isLoggedIn: true };
      localStorage.setItem('token', JSON.stringify(state.email));
      return { ...state };
    default:
      return { ...state };
  }
};

export default loginReducer;
