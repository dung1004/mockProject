import * as type from './constants';

export function loginRequest(email, password, submit) {
  return {
    type: type.LOGIN_REQUEST,
    email,
    password,
    submit,
  };
}
export function loginSuccess(userInfo) {
  return {
    type: type.LOGIN_SUCCESS,
    userInfo,
  };
}

export function loginFailure(err) {
  return {
    type: type.LOGIN_FAILURE,
    err,
  };
}
