import * as type from './constants';

export const initialState = { dataClass: [] };

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_CLASS:
      return { ...state };
    case type.FETCH_CLASS_SUCCESS:
      return {
        ...state,
        dataClass: [...action.data],
        day: [...new Set(action.day)],
      };
    case type.GET_SEARCH_SUCCESS:
      return {
        ...state,
        dataClass: [...action.values],
        day: [...new Set(action.day)],
      };
    case type.GET_WEEKDAY_SUCCSESS:
      return { ...state, dataClass: [...action.values] };
    default:
      return { ...state };
  }
};

export default classReducer;
