import React from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';

const Messages = () => {
  const { list } = useSelector((state) => state.messages);
  const { active, list: channelsList } = useSelector((state) => state.channels);

  const activeChannel = channelsList.find((el) => el.id === active) || { name: 'undefined' };
  console.log('file: Messages.jsx:10 || Messages || activeChannel:', activeChannel);

  const activeMessages = list.filter(({ channelId }) => channelId === active);
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
          сообщение
        </span>
      </div>
      <div className="messages px-5">
        {messages}
      </div>
    </>
  );
};

export default Messages;
