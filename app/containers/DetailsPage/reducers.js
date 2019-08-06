import * as type from './constants';

export const initialState = { user: [] };

const detailsPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.FETCH_USER:
      return { ...state };
    case type.FETCH_USER_SUCCESS:
      return { user: action.user };
    default:
      return { ...state };
  }
};

export default detailsPageReducer;
