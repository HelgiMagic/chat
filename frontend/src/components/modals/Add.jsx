/* eslint-disable jsx-a11y/no-autofocus */
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { createChannel } from '../../socketWrapper';
import { setActiveModal } from '../../slices/modalSlice';

const Add = () => {
  const { t } = useTranslation();
  const { list } = useSelector((state) => state.channels);
  const names = list.map(({ name }) => name);
  console.log(names);

  const validationSchema = yup.object({
    channelName: yup
      .string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(names, 'Должно быть уникальным')
      .required('Обязательное поле'),
  });

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setActiveModal(null));
  };

  const handleSubmit = ({ channelName }) => {
    createChannel(channelName, t);
    handleClose();
  };

  const initValues = { channelName: '' };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Formik
          initialValues={initValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="channelName" className="form-control mb-2" autoFocus />
              {errors.channelName && touched.channelName ? (
                <div className="invalid-feedback">{errors.channelName}</div>
              ) : null}
              <div className="d-flex justify-content-end">
                <button
                  type="button"
                  className="me-2 btn btn-secondary"
                  onClick={handleClose}
                >
                  {t('cancel')}
                </button>
                <button type="submit" className="btn btn-primary">
                  {t('send')}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
