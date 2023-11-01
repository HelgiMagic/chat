import React from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';

const Messages = () => {
  const { list } = useSelector((state) => state.messages);
  const { active } = useSelector((state) => state.channels);
  console.log(active);
  const activeMessages = list.filter((channelId) => channelId === active);
  const messages = activeMessages.map(({
    body, id, username,
  }) => <Message key={id} name={username}>{body}</Message>);

  return (
    <div className="messages px-5">
      {messages}
    </div>
  );
};

export default Messages;
