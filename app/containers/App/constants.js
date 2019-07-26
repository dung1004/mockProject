/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
// lấy tài khoản người dùng
export const FETCH_USER = 'containers/App/FETCH_USER';
export const FETCH_USER_SUCCESS = 'containers/App/FETCH_USER_SUCCESS';

// lấy tất cả data
export const FETCH_DATA = 'containers/App/FETCH_DATA';
export const FETCH_DATA_SUCCESS = 'containers/App/FETCH_DATA_SUCCESS';
