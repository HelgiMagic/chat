import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import LoginContext from '../contexts/loginContext';
import routes from '../routes';

const validationSchema = yup.object({
  login: yup.string().min(3, 'Минимум 3 буквы').max(50, 'Максимум 50 букв'),
  password: yup.string().min(3, 'Минимум 3 буквы'),
});

const LoginPage = () => {
  const { t } = useTranslation();
  const { token, setToken } = useContext(LoginContext);
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
      setError(<div>{t('invalidName')}</div>);
    }
  };

  return (
    <div className="login__container">
      <div className="form__container">
        <div className="form__main p-5">
          <div className="left-column">
            <img src="mountainman.jpg" alt="mountain man" className="rounded-circle" />
          </div>
          <div className="right-column">
            <h1 className="text-center">{t('enter')}</h1>
            <Formik
              initialValues={initValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="login__form">
                  <Field
                    name="login"
                    placeholder={t('yourName')}
                    className="form-control"
                  />
                  {errors.login && touched.login ? (
                    <div>{errors.login}</div>
                  ) : null}
                  <Field
                    name="password"
                    placeholder={t('yourPassword')}
                    className="form-control"
                  />
                  {errors.password && touched.password ? (
                    <div>{errors.password}</div>
                  ) : null}
                  {error}
                  <button type="submit" className="btn btn-outline-primary">
                    {t('enter')}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="registration p-4">
          <div className="text-center">
            <span>{t('noAccount')}</span>
            {' '}
            <a href="/signup">{t('registration')}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
