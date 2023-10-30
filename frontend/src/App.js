import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import NotFoundPage from './components/NotFoundPage';
import SignUpPage from './components/SignUpPage';
import LoginContext from './contexts/loginContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginProvider = ({ children }) => {
  const token = localStorage.getItem('loginToken');
  const setToken = (value) => localStorage.setItem('loginToken', value);
  const getToken = () => localStorage.getItem('loginToken');

  return (
    <LoginContext.Provider value={{ token, setToken, getToken }}>
      {children}
    </LoginContext.Provider>
  );
};

const App = () => (
  <LoginProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="404" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </LoginProvider>
);

export default App;
