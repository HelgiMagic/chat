import { toast } from 'react-toastify';
import socket from './socketStarter';

export const sendMessage = (body, channelId, username, setInput, t) => {
  socket
    .timeout(5000)
    .emit('newMessage', { body, channelId, username }, (err) => {
      if (!err) setInput('');
      else toast.error(t('networkError'));
    });
};

export const createChannel = (name, t) => {
  socket.timeout(5000).emit('newChannel', { name }, (err) => {
    if (!err) toast.success(t('channelCreated'));
    else toast.error(t('networkError'));
  });
};

export const removeChannel = (id) => {
  socket.timeout(5000).emit('removeChannel', { id });
};

export const renameChannel = (id, name) => {
  socket.timeout(5000).emit('renameChannel', { id, name });
};
