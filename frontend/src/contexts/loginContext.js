import { createContext } from 'react';

export default createContext({
  token: '',
  username: '',
  loggedIn: false,
  logIn: () => {},
  logOut: () => {},
});
