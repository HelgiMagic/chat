/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { createChannel } from '../../socketWrapper';
import { setActiveModal } from '../../slices/modalSlice';
import { setActive } from '../../slices/channelsSlice';

const Add = () => {
  const { t } = useTranslation();
  const { list } = useSelector((state) => state.channels);
  const names = list.map(({ name }) => name);
  console.log(names);

  const validationSchema = yup.object({
    channelName: yup
      .string()
      .min(3, t('from3To20'))
      .max(20, t('from3To20'))
      .notOneOf(names, t('shouldBeUnique'))
      .required(t('required')),
  });

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setActiveModal(null));
  };

  const handleSubmit = async ({ channelName }) => {
    try {
      const response = await createChannel(channelName);

      dispatch(setActive(response.data.id));
      toast.success(t('channelCreated'));

      handleClose();
    } catch (e) {
      toast.error(t('networkError'));
    }
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
              <Field name="channelName" id="channelName" className="form-control mb-2" autoFocus />
              <label className="visually-hidden" htmlFor="channelName">Имя канала</label>
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
