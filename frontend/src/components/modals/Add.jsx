/* eslint-disable jsx-a11y/no-autofocus */
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createChannel } from '../../socketWrapper';
import { setActiveModal } from '../../slices/modalSlice';

const Add = () => {
  const { t } = useTranslation();
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleInput = (e) => setInput(e.target.value);

  const handleClose = () => {
    dispatch(setActiveModal(null));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createChannel(input, t);
    handleClose();
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <input
            className="mb-2 form-control"
            value={input}
            onInput={handleInput}
            required
            autoFocus
          />
          <div className="d-flex justify-content-end">
            <button type="button" className="me-2 btn btn-secondary" onClick={handleClose}>
              {t('cancel')}
            </button>
            <button type="submit" className="btn btn-primary">
              {t('send')}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
