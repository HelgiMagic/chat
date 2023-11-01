import React from 'react';
import { useSelector } from 'react-redux';
import Channel from './Channel';

const Channels = () => {
  const { list, active } = useSelector((state) => state.channels);
  const channels = list.map(({ id, name }) => <Channel key={id}>{name}</Channel>);

  return (
    <ul className="channels-list nav nav-pills nav-fill px-2 d-block overflow-auto">
      {channels}
    </ul>
  );
};

export default Channels;
