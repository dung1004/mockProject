// import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectLog = state => state.login || initialState;

// const makeSelectUsers = () =>
//   createSelector(
//     selectLog,
//     loginState => loginState.email,
//   );
export { selectLog };
// export { selectLog, makeSelectUsers };
