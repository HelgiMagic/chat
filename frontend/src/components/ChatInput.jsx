/* eslint-disable jsx-a11y/no-autofocus */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { sendMessage } from '../socketWrapper';

const ChatInput = ({ username }) => {
  const [value, setValue] = useState('');
  const { t } = useTranslation();

  const activeChannel = useSelector((state) => state.channels.active);

  const handleInput = (e) => setValue(e.target.value);
  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log('message sending');
    sendMessage(value, activeChannel, username, setValue, t);
  };

  return (
    <div className="right-panel__input">
      <form
        noValidate=""
        className="py-1 border rounded-2"
        onSubmit={handleSendMessage}
      >
        <div className="input-group has-validation">
          <input
            name="body"
            aria-label="Новое сообщение"
            placeholder={t('enterMessage')}
            className="border-0 p-0 ps-2 form-control"
            value={value}
            onChange={handleInput}
            autoFocus
          />
          <button type="submit" disabled="" className="btn btn-group-vertical">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
            <span className="visually-hidden">Отправить</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
