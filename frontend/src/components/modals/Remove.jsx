import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { removeChannel } from '../../socketWrapper';
import { setActiveModal } from '../../slices/modalSlice';

const Remove = () => {
  const { t } = useTranslation();
  const activeElementId = useSelector((state) => state.modal.activeElementId);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setActiveModal(null));
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log('huy');
    removeChannel(activeElementId, t);
    handleClose();
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={handleClose}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <button type="button" className="me-2 btn btn-secondary" onClick={handleClose}>
            Отменить
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleClick}
          >
            Удалить
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
