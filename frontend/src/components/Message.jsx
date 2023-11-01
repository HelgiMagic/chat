import React from 'react';

const Message = ({ name, children }) => (
  <p>
    <b>{name}</b>
    :
    {' '}
    {children}
  </p>
);

export default Message;
