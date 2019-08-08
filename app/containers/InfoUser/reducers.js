import * as type from './constants';

export const initialState = {};

const inFoUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.GET_DATA:
      return { state };
    case type.GET_DATA_SUCCESS:
      return { students: action.students, teachers: action.teachers };
    default:
      return { state };
  }
};

export default inFoUserReducer;
