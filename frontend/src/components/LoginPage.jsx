/* eslint-disable jsx-a11y/label-has-associated-control */
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoginContext from '../contexts/loginContext';
import routes from '../routes';

const LoginPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { logIn } = useContext(LoginContext);
  const [error, setError] = useState(null);

  const validationSchema = yup.object({
    login: yup.string().min(3, t('from3To20')).max(20, t('from3To20')),
    password: yup.string(),
  });

  const initValues = { login: '', password: '' };

  const handleSubmit = async ({ login, password }) => {
    try {
      const response = await axios.post(routes.login(), {
        username: login,
        password,
      });

      const { data } = response;

      setError(null);

      logIn(data.token, login);
      navigate('/');
    } catch (e) {
      console.log(e);
      if (e.message === 'Network Error') toast.error(t('networkError'));
      else setError(t('invalidName'));
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
                  <div className="form-floating">
                    <Field
                      name="login"
                      id="login"
                      placeholder={t('yourName')}
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="login">
                      {t('yourName')}
                    </label>
                    {errors.login && touched.login ? (
                      <div className="invalid-tooltip">{errors.login}</div>
                    ) : null}
                  </div>

                  <div className="form-floating">
                    <Field
                      name="password"
                      id="password"
                      placeholder={t('yourPassword')}
                      className="form-control"
                    />
                    <label className="form-label" htmlFor="password">
                      {t('yourPassword')}
                    </label>
                    {errors.password && touched.password ? (
                      <div className="invalid-tooltip">{errors.password}</div>
                    ) : null}
                  </div>

                  {error ? (
                    <div className="invalid-feedback">{error}</div>
                  ) : null}

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
