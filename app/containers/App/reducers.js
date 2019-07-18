/* eslint-disable no-param-reassign */
import * as type from './constants';

export const initialState = [];

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_DATA:
      return [...state];
    default:
      return [...state];
  }
};

export default appReducer;
