/* eslint-disable react/jsx-no-constructed-context-values */
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import NotFoundPage from './components/NotFoundPage';
import SignUpPage from './components/SignUpPage';
import LoginContext from './contexts/loginContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addMessage } from './slices/messagesSlice';
import { addChannel } from './slices/channelsSlice';
import socket from './socketStarter';
import './i18next.js';
import 'react-toastify/dist/ReactToastify.css';

const setToken = (value) => localStorage.setItem('loginToken', value);

const handleClick = () => {
  setToken('');
  window.location.href = '/login';
};

const token = localStorage.getItem('loginToken');

const ExitButton = () => {
  const { t } = useTranslation('');

  if (token.length < 1) return null;

  return (
    <button type="button" className="btn btn-primary" onClick={handleClick}>
      {t('exit')}
    </button>
  );
};

const LoginProvider = ({ children }) => {
  const getToken = () => localStorage.getItem('loginToken');
  const username = localStorage.getItem('username');
  const setUsername = (value) => localStorage.setItem('username', value);

  return (
    <LoginContext.Provider value={{
      token, setToken, getToken, username, setUsername,
    }}
    >
      {children}
    </LoginContext.Provider>
  );
};

const SocketWrapper = () => {
  const dispatch = useDispatch();

  socket.on('newMessage', (payload) => {
    console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    console.log(payload); // { id: 6, name: "new channel", removable: true }
    dispatch(addChannel(payload));
  });

  return null;
};

const rollbarConfig = {
  accessToken: 'a0701e36619448ba800781eb78b5f6d8',
  environment: 'testenv',
};

const App = () => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <LoginProvider>
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">
              Hexlet Chat
            </a>
            <ExitButton />
          </div>
        </nav>
        <SocketWrapper />
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="404" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </ErrorBoundary>
  </Provider>
);

export default App;
