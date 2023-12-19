/* eslint-disable curly */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useTranslation } from 'react-i18next';
import { setActive } from '../slices/channelsSlice';
import { setActiveModal, setActiveElementId } from '../slices/modalSlice';

const Channel = ({ children, id, removable }) => {
  const { t } = useTranslation();

  const activeChannel = useSelector((state) => state.channels.active);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setActive(id));
  };

  const isActive = id === activeChannel;

  const buttonClass = cn('w-100', 'rounded-0', 'text-start', 'btn', {
    'btn-secondary': isActive,
  });

  if (!removable) return (
    <li className="nav-item w-100 d-flex btn-group">
      <button type="button" className={buttonClass} onClick={handleClick}>
        <span className="me-1">#</span>
        {children}
      </button>
    </li>
  );

  const variant = isActive ? 'secondary' : '';

  const handleRename = () => {
    dispatch(setActiveElementId(id));
    dispatch(setActiveModal('rename'));
  };

  const handleRemove = () => {
    dispatch(setActiveElementId(id));
    dispatch(setActiveModal('remove'));
  };

  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button variant={variant} className="rounded-0 text-start" onClick={handleClick}>
          <span className="me-1">#</span>
          {children}
        </Button>

        <Dropdown.Toggle split variant={variant} className="flex-grow-0">
          <span className="visually-hidden">Управление каналом</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleRemove}>{t('delete')}</Dropdown.Item>
          <Dropdown.Item onClick={handleRename}>{t('rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </li>
  );
};

export default Channel;
