import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import { renameChannel } from '../../socketWrapper';
import { setActiveModal } from '../../slices/modalSlice';

const Rename = () => {
  const { t } = useTranslation();
  const activeElementId = useSelector((state) => state.modal.activeElementId);
  const [input, setInput] = useState('');

  const dispatch = useDispatch();

  const handleInput = (e) => setInput(e.target.value);

  const handleClose = () => {
    dispatch(setActiveModal(null));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('huy');
    renameChannel(activeElementId, input, t);
    handleClose();
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>Rename</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <input
            className="mb-2 form-control"
            value={input}
            onInput={handleInput}
          />
          <div className="d-flex justify-content-end">
            <button type="button" className="me-2 btn btn-secondary" onClick={handleClose}>
              Отменить
            </button>
            <button type="submit" className="btn btn-primary">
              Отправить
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
