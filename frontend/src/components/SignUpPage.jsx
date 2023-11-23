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
      if (e.response.status === 409) setError(<div>{t('alreadyExist')}</div>);
      else setError(<div>{t('unknownError')}</div>);
    }
  };

  return (
    <div className="login__container">
      <div className="form__container">
        <div className="form__main p-5">
          <div className="left-column">
            <img src="happyman.jpg" alt="mountain man" className="rounded-circle" />
          </div>
          <div className="right-column">
            <h1 className="text-center">{t('registration')}</h1>
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
                  <Field
                    name="confirmPassword"
                    placeholder={t('passwordConfirmation')}
                    className="form-control"
                  />
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <div>{errors.confirmPassword}</div>
                  ) : null}
                  {error}
                  <button type="submit" className="btn btn-outline-primary">
                    {t('register')}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
