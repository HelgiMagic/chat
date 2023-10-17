import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const validationSchema= yup.object({
  login: yup.string().min(3, 'Минимум 3 буквы').max(50, 'Максимум 50 букв'),
  password: yup.string().min(3, 'Минимум 3 буквы'),
});

export default function LoginPage() {
  const initValues = { login: '', password: '' };
  return (
    <div className='login__container'>
      <div className='form__container'>
        <Formik initialValues={initValues} validationSchema={validationSchema}>
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
              <button type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}