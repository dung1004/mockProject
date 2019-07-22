import * as type from './constants';

export function loginRequest(email, password, submit) {
  return {
    type: type.LOGIN_REQUEST,
    email,
    password,
    submit,
  };
}
export function loginSuccess() {
  return {
    type: type.LOGIN_SUCCESS,
  };
}
