import * as type from './constants';

export function fetchData() {
  return {
    type: type.FETCH_DATA,
  };
}
