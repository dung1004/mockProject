import * as type from './constants';

export const initialState = {};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_SEARCH:
      return { ...state, keyword: action.key };
    // case type.FETCH_DATA_SUCCESS:
    //   state = { ...state, data: { ...action.allData } };
    //   return { ...state };
    default:
      return { ...state };
  }
};

export default appReducer;
