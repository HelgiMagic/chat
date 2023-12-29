/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react-hooks/rules-of-hooks */
// import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import filter from 'leo-profanity';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import {
  BrowserRouter, Routes, Route, Navigate, Outlet,
} from 'react-router-dom';
import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'

import { ToastContainer } from 'react-toastify';
import { useContext, useState } from 'react';
import { addMessage } from './slices/messagesSlice';
import {
  addChannel,
  renameChannel,
  removeChannel,
} from './slices/channelsSlice';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import MyModal from './components/modals/Modal.jsx';
import routes from './routes.js';

import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import NotFoundPage from './components/NotFoundPage';
import SignUpPage from './components/SignUpPage';
import LoginContext from './contexts/loginContext';

import resources from './locales/index.js';
import Navbar from './components/Navbar.jsx';
import store from './slices/index.js';

const LoginProvider = ({ children }) => {
  const token = localStorage.getItem('loginToken');

  const loginState = Boolean(token);

  const [loggedIn, setLoggedIn] = useState(loginState);

  const logIn = (tokenValue, username) => {
    localStorage.setItem('loginToken', tokenValue);

    localStorage.setItem('username', username);
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.setItem('loginToken', '');
    setLoggedIn(false);

    localStorage.setItem('username', '');
  };

  const username = localStorage.getItem('username');

  return (
    <LoginContext.Provider
      value={{
        token,
        username,
        loggedIn,
        logIn,
        logOut,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

const ProtectedRoute = () => {
  const { loggedIn } = useContext(LoginContext);
  console.log(loggedIn);

  return loggedIn ? <Outlet /> : <Navigate to={routes.loginPage()} />;
};

const runApp = async () => {
  const rus = filter.getDictionary('ru');
  const eng = filter.getDictionary('eng');
  filter.addDictionary('engRus', [...rus, ...eng]);
  filter.loadDictionary('engRus');

  const i18nextInstance = i18next.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      resources, // передаем переводы текстов интерфейса в формате JSON
      lng: 'ru', // если переводы на языке пользователя недоступны, то будет использоваться язык, указанный в этом поле
      fallbackLng: 'ru',
      interpolation: {
        escapeValue: false, // экранирование уже есть в React, поэтому отключаем
      },
    });

  const socket = io();

  socket.on('newMessage', (payload) => {
    console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    console.log(payload); // { id: 6, name: "new channel", removable: true }
    store.dispatch(addChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    console.log(payload); // { id: 7, name: "new name channel", removable: true }
    store.dispatch(renameChannel(payload));
  });

  socket.on('removeChannel', (id) => {
    console.log(id); // { id: 6 };
    store.dispatch(removeChannel(id));
  });

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR,
    environment: 'testenv',
  };

  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <LoginProvider>
          <I18nextProvider i18n={i18nextInstance}>
            <Navbar />
            <MyModal />
            <ToastContainer />
            <BrowserRouter>
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<MainPage />} />
                </Route>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route path="404" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </I18nextProvider>
        </LoginProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default runApp;
