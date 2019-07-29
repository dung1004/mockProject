import * as type from './constants';

export const initialState = {};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.LOGIN_REQUEST:
      return { ...action, submit: true };
    case type.LOGIN_SUCCESS:
      localStorage.setItem(
        'token',
        JSON.stringify({ email: state.email, level: action.level }),
      );
      return { ...state, isLoggedIn: true, level: action.level };
    case type.LOGIN_FAILURE:
      return { err: action.err };
    default:
      return { ...state };
  }
};

export default loginReducer;
