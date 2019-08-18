import * as type from './constants';

export const initialState = { data: [] };

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_DATA:
      return { ...state };
    case type.GET_DATA_SUCCESS:
      return { ...state, data: [...action.values] };
    // case type.GET_KEY:
    //   return { ...state, key: action.key };
    // case type.GET_KEY_FILTER:
    //   return { ...state, keyFil: [...new Set(action.item)] };
    default:
      return { ...state };
  }
};

export default appReducer;
