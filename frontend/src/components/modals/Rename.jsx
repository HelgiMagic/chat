import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import { renameChannel } from '../../socketWrapper';

const Rename = () => {
  const { t } = useTranslation();
  const activeElementId = useSelector((state) => state.modal.activeElementId);
  const [input, setInput] = useState('');

  const handleInput = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('huy');
    renameChannel(activeElementId, input, t);
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton>
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
            <button type="button" className="me-2 btn btn-secondary">
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
