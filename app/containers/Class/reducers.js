import * as type from './constants';

export const initialState = { dataClass: [] };

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_CLASS:
      return { ...state };
    case type.FETCH_CLASS_SUCCESS:
      return { dataClass: [...action.data] };
    default:
      return { ...state };
  }
};

export default classReducer;
