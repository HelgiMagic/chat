import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { useContext, useState } from 'react';
import LoginContext from '../contexts/loginContext';
import axios from 'axios';
import routes from '../routes';

const validationSchema= yup.object({
  login: yup.string().min(3, 'Минимум 3 буквы').max(50, 'Максимум 50 букв'),
  password: yup.string().min(3, 'Минимум 3 буквы'),
});

export default function LoginPage() {
  const { token, setToken, getToken } = useContext(LoginContext);
  const [error, setError] = useState(null);

  console.log(token);
  const initValues = { login: '', password: '' };

  const handleSubmit = async ({ login, password }) => {
    try {
      const response = await axios.post(routes.login(), { username: login, password });
      console.log(response.data);
      const { data } = response;
    
      console.log(data);
      setToken(data.token);
    } catch(e) {
      setError(<div>Неверные имя пользователя или пароль</div>);
    }
  };

  return (
    <div className='login__container'>
      <div className='form__container'>
        <Formik initialValues={initValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ errors, touched }) => (
            <Form className='login__form'>
              <Field name="login" />
              {errors.login && touched.login ? (
                <div>{errors.login}</div>
              ) : null}
              <Field name="password" />
              {errors.password && touched.password ? (
                <div>{errors.password}</div>
              ) : null}
              {error}
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
        <div>
          <p>Нет аккаунта?</p>
          <a href='signup'>Регистрация</a>
        </div>
      </div>
    </div>
  );
}