import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Message from './Message';

const Messages = () => {
  const { t } = useTranslation();
  const { active, list: channelsList } = useSelector((state) => state.channels);

  const messagesRef = useRef(null);

  const activeMessages = useSelector((state) => state.messages.list
    .filter(({ channelId }) => channelId === active));

  const activeChannel = channelsList.find((el) => el.id === active) || { name: 'undefined' };

  useEffect(() => {
    messagesRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  });

  const messages = activeMessages.map(({
    body, id, username,
  }) => <Message key={id} name={username}>{body}</Message>);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
            {' '}
            {activeChannel.name}
          </b>
        </p>
        <span className="text-muted">
          {activeMessages.length}
          {' '}
          {t('message')}
        </span>
      </div>
      <div className="messages px-5">
        {messages}
        <div ref={messagesRef} />
      </div>
    </>
  );
};

export default Messages;
