/* eslint-disable jsx-a11y/no-autofocus */
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import { renameChannel } from '../../socketWrapper';
import { setActiveModal } from '../../slices/modalSlice';

const Rename = () => {
  const { t } = useTranslation();
  const activeElementId = useSelector((state) => state.modal.activeElementId);

  const { list } = useSelector((state) => state.channels);
  const { name } = list.find(({ id }) => id === activeElementId);
  const [input, setInput] = useState(name);

  const dispatch = useDispatch();

  const handleInput = (e) => setInput(e.target.value);

  const handleClose = () => {
    dispatch(setActiveModal(null));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    renameChannel(activeElementId, input, t);
    handleClose();
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>{t('renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <input
            className="mb-2 form-control"
            value={input}
            onInput={handleInput}
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

export default Rename;
