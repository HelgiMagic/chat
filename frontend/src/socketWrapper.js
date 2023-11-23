import socket from './socketStarter';

export const sendMessage = (body, channelId, username) => {
  socket
    .timeout(5000)
    .emit('newMessage', { body, channelId, username }, (err) => {
      if (err) {
        console.log('123 error!!!!');
      }
    });
};

export const createChannel = (name) => {
  socket.timeout(5000).emit('newChannel', { name });
};

export const removeChannel = (id) => {
  socket.timeout(5000).emit('removeChannel', { id });
};

export const renameChannel = (id, name) => {
  socket.timeout(5000).emit('renameChannel', { id, name });
};
