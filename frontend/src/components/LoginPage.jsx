import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import LoginContext from '../contexts/loginContext';
import routes from '../routes';

const validationSchema = yup.object({
  login: yup.string().min(3, 'Минимум 3 буквы').max(50, 'Максимум 50 букв'),
  password: yup.string().min(3, 'Минимум 3 буквы'),
});

const LoginPage = () => {
  const { token, setToken, getToken } = useContext(LoginContext);
  const [error, setError] = useState(null);

  console.log(token);
  const initValues = { login: '', password: '' };

  const handleSubmit = async ({ login, password }) => {
    try {
      const response = await axios.post(routes.login(), {
        username: login,
        password,
      });
      console.log(response.data);
      const { data } = response;

      console.log(data);
      setError(null);
      setToken(data.token);
      window.location.href = '/';
    } catch (e) {
      console.log(e);
      setError(<div>Неверные имя пользователя или пароль</div>);
    }
  };

  return (
    <div className="login__container">
      <div className="form__container">
        <div className="form__main p-5">
          <div className="left-column">
            <img src="mountainman.jpg" alt="mountain man" />
          </div>
          <div className="right-column">
            <h1 className="text-center">Войти</h1>
            <Formik
              initialValues={initValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="login__form">
                  <Field
                    name="login"
                    placeholder="Ваш ник"
                    className="form-control"
                  />
                  {errors.login && touched.login ? (
                    <div>{errors.login}</div>
                  ) : null}
                  <Field
                    name="password"
                    placeholder="Ваш пароль"
                    className="form-control"
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                  {error}
                  <button type="submit" className="btn btn-outline-primary">
                    Войти
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="registration p-4">
          <div className="text-center">
            <span>Нет аккаунта?</span>
            {' '}
            <a href="/signup">Регистрация</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
