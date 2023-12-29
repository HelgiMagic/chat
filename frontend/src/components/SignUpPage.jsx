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

const SignUpPage = () => {
  const { t } = useTranslation();
  const { logIn } = useContext(LoginContext);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const initValues = { login: '', password: '', confirmPassword: '' };

  const validationSchema = yup.object({
    login: yup
      .string()
      .min(3, t('from3To20'))
      .max(20, t('from3To20')),

    password: yup.string().min(6, t('atLeast6')),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('passwordsShouldBeEqual'))
      .required(t('passwordRequired')),
  });

  const handleSubmit = async ({ login, password }) => {
    try {
      const response = await axios.post(routes.signUp(), {
        username: login,
        password,
      });
      console.log(response.data);
      const { data } = response;

      console.log(data);
      setError(null);

      logIn(data.token, logIn);

      navigate('/');
    } catch (e) {
      console.log(e);
      if (e.message === 'Network Error') toast.error(t('networkError'));
      else if (e.response.status === 409) {
        setError(t('alreadyExist'));
      } else {
        setError(t('unknownError'));
      }
    }
  };

  return (
    <div className="login__container">
      <div className="form__container">
        <div className="form__main p-5">
          <div className="left-column">
            <img
              src="happyman.jpg"
              alt="mountain man"
              className="rounded-circle"
            />
          </div>
          <div className="right-column">
            <h1 className="text-center">{t('registration')}</h1>
            <Formik
              initialValues={initValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => {
                console.log(errors.login);
                return (
                  <Form className="login__form">
                    <div className="form-floating">
                      <Field
                        name="login"
                        id="login"
                        placeholder={t('yourName')}
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="login">
                        Имя пользователя
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
                        Пароль
                      </label>
                      {errors.password && touched.password ? (
                        <div className="invalid-tooltip">{errors.password}</div>
                      ) : null}
                    </div>
                    <div className="form-floating">
                      <Field
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder={t('passwordConfirmation')}
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="confirmPassword">
                        Подтвердите пароль
                      </label>
                      {errors.confirmPassword && touched.confirmPassword ? (
                        <div className="invalid-tooltip">
                          {errors.confirmPassword}
                        </div>
                      ) : null}
                    </div>
                    {error ? (
                      <div className="invalid-feedback">{error}</div>
                    ) : null}
                    <button type="submit" className="btn btn-outline-primary">
                      {t('register')}
                    </button>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
