import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import LoginContext from '../contexts/loginContext';
import routes from '../routes';

const validationSchema = yup.object({
  login: yup
    .string()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
  password: yup.string().min(6, 'Не менее 6 символов'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
    .required('Подтверждение пароля необходимо'),
});

const SignUpPage = () => {
  const { t } = useTranslation();
  const { token, setToken, setUsername } = useContext(LoginContext);
  const [error, setError] = useState(null);

  console.log(token);
  const initValues = { login: '', password: '', confirmPassword: '' };

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
      setToken(data.token);
      setUsername(login);
      window.location.href = '/';
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
                    <div className="relative">
                      <Field
                        name="login"
                        placeholder={t('yourName')}
                        className="form-control"
                      />
                      {errors.login && touched.login ? (
                        <div className="invalid-tooltip">{errors.login}</div>
                      ) : null}
                    </div>
                    <div className="relative">
                      <Field
                        name="password"
                        placeholder={t('yourPassword')}
                        className="form-control"
                      />
                      {errors.password && touched.password ? (
                        <div className="invalid-tooltip">{errors.password}</div>
                      ) : null}
                    </div>
                    <div className="relative">
                      <Field
                        name="confirmPassword"
                        placeholder={t('passwordConfirmation')}
                        className="form-control"
                      />
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
