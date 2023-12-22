/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import filter from 'leo-profanity';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'

import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { addMessage } from './slices/messagesSlice';
import {
  addChannel,
  renameChannel,
  removeChannel,
  setActive,
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

  const dispatch = useDispatch();

  const socket = io();

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

  const rollbarConfig = {
    accessToken: 'a0701e36619448ba800781eb78b5f6d8',
    environment: 'testenv',
  };

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

  const ProtectedRoute = () => {
    const { token } = useContext(LoginContext);
    if (!token) return <Navigate to={routes.loginPage()} />;

    return <MainPage />;
  };

  const App = () => (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <LoginProvider>
          <I18nextProvider i18n={i18nextInstance}>
            <Navbar />
            <MyModal />
            <ToastContainer />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<ProtectedRoute />} />
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

  return App;
};

export default runApp;
