import * as type from './constants';

export const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')),
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.LOGIN_REQUEST:
      return { ...state, submit: true };
    case type.LOGIN_SUCCESS:
      localStorage.setItem(
        'token',
        JSON.stringify({
          mail: action.userInfo.email,
          level: action.userInfo.level,
          id: action.userInfo.id,
          name: action.userInfo.lastName,
        }),
      );
      localStorage.setItem('isLoggedIn', true);
      return {
        ...state,
        isLoggedIn: true,
        user: localStorage.getItem('token'),
      };
    case type.LOGIN_FAILURE:
      return { ...state };
    default:
      return { ...state };
  }
};

export default loginReducer;
