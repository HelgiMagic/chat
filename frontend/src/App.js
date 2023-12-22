/* eslint-disable react/jsx-no-constructed-context-values */
import './App.css';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'
import { useContext } from 'react';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import NotFoundPage from './components/NotFoundPage';
import SignUpPage from './components/SignUpPage';
import LoginContext from './contexts/loginContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addMessage } from './slices/messagesSlice';
import {
  addChannel,
  renameChannel,
  removeChannel,
  setActive,
} from './slices/channelsSlice';
import socket from './socketStarter';
import './i18next.js';
import 'react-toastify/dist/ReactToastify.css';
import MyModal from './components/modals/Modal.jsx';
// import routes from './routes.js';

const LoginProvider = ({ children }) => {
  const getToken = () => localStorage.getItem('loginToken');
  const token = localStorage.getItem('loginToken');
  const setToken = (value) => localStorage.setItem('loginToken', value);
  const username = localStorage.getItem('username');
  const setUsername = (value) => localStorage.setItem('username', value);

  return (
    <LoginContext.Provider
      value={{
        token,
        setToken,
        getToken,
        username,
        setUsername,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

const ExitButton = () => {
  const { t } = useTranslation();
  const { token, setToken } = useContext(LoginContext);

  if (!token) return null;

  const handleClick = () => {
    setToken('');
  };

  return (
    <button type="button" className="btn btn-primary" onClick={handleClick}>
      {t('exit')}
    </button>
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

  socket.on('renameChannel', (payload) => {
    console.log(payload); // { id: 7, name: "new name channel", removable: true }
    dispatch(renameChannel(payload));
  });

  const activeId = useSelector((state) => (state.channels.active));

  socket.on('removeChannel', (id) => {
    console.log(id); // { id: 6 };
    dispatch(removeChannel(id));
    if (activeId === id) {
      dispatch(setActive(1));
    }
  });

  return null;
};

const rollbarConfig = {
  accessToken: 'a0701e36619448ba800781eb78b5f6d8',
  environment: 'testenv',
};

const ProtectedRoute = () => {
  const { token } = useContext(LoginContext);
  if (!token) return <Navigate to="/login" />;

  return <MainPage />;
};

const App = () => {
  const { t } = useTranslation();
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <LoginProvider>
          <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="/">
                {t('projectName')}
              </a>
              <ExitButton />
            </div>
          </nav>
          <MyModal />
          <SocketWrapper />
          <ToastContainer />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ProtectedRoute />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="404" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </LoginProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
