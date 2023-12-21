/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { renameChannel } from '../../socketWrapper';
import { setActiveModal } from '../../slices/modalSlice';

const Rename = () => {
  const { t } = useTranslation();
  const activeElementId = useSelector((state) => state.modal.activeElementId);
  const { list } = useSelector((state) => state.channels);
  const names = list.map(({ name }) => name);

  const validationSchema = yup.object({
    channelName: yup
      .string()
      .min(3, t('from3To20'))
      .max(20, t('from3To20'))
      .notOneOf(names, t('shouldBeUnique'))
      .required(t('required')),
  });

  const { name } = list.find(({ id }) => id === activeElementId);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setActiveModal(null));
  };

  const handleSubmit = ({ channelName }) => {
    renameChannel(activeElementId, channelName, t);
    handleClose();
  };

  const initValues = { channelName: name };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('renameChannel')}</Modal.Title>
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

export default Rename;
