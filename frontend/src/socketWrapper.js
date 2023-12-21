import { toast } from 'react-toastify';
import socket from './socketStarter';

export const sendMessage = (body, channelId, username, callback) => {
  socket
    .timeout(5000)
    .emit('newMessage', { body, channelId, username }, (err) => callback(err));
};

export const createChannel = (name, t) => {
  socket.timeout(5000).emit('newChannel', { name }, (err) => {
    if (!err) toast.success(t('channelCreated'));
    else toast.error(t('networkError'));
  });
};

export const removeChannel = (id, t) => {
  socket.timeout(5000).emit('removeChannel', { id }, (err) => {
    if (!err) toast.success(t('channelRemoved'));
    else toast.error(t('networkError'));
  });
};

export const renameChannel = (id, name, t) => {
  socket.timeout(5000).emit('renameChannel', { id, name }, (err) => {
    if (!err) toast.success(t('channelRenamed'));
    else toast.error(t('networkError'));
  });
};
