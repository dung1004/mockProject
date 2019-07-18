/* eslint-disable import/named */
// eslint-disable-next-line import/no-unresolved
import axios from 'axios';
import { API_URL } from './constants';

export default function callApi(enpoint, method = 'get', body) {
  return axios({
    method,
    url: `${API_URL}${enpoint}`,
    data: body,
  }).catch(err => {
    console.log(err);
  });
}
