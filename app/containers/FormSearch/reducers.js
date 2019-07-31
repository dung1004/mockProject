import * as type from './constants';

export const initialState = {};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_SEARCH:
      return { keyword: action.key, data: action.data };
    case type.GET_SEARCH_SUCCESS:
      return { data: [...action.values] };
    default:
      return { ...state };
  }
};

export default appReducer;
