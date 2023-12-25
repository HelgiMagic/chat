import { createContext } from 'react';

export default createContext({
  login: false,
  token: '',
  setToken: () => {},
  getToken: () => {},
  username: '',
  setUsername: () => {},
});
