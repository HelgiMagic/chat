import { createContext } from 'react';

export default createContext({
  token: '',
  setToken: () => {},
  getToken: () => {},
  username: '',
  setUsername: () => {},
});
