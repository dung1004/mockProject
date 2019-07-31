import * as type from './constants';

export const initialState = { data: [] };

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_DATA:
      return { ...state };
    case type.GET_DATA_SUCCESS:
      return { ...state, data: [...action.values] };
    case type.GET_KEY:
      return { ...state, key: action.key };
    default:
      return { ...state };
  }
};

export default appReducer;
