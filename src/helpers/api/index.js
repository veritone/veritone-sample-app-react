import { selectUserApiToken } from 'modules/user';

export function commonHeaders(state) {
  return {
    Authorization: `Bearer ${selectUserApiToken(state)}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };
}
