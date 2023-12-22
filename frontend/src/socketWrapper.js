import socket from './socketStarter';

export const sendMessage = (body, channelId, username) => new Promise((resolve, reject) => {
  socket
    .timeout(5000)
    .emit('newMessage', { body, channelId, username }, (err) => {
      if (err) return reject(err);
      return resolve();
    });
});

export const createChannel = (name) => new Promise((resolve, reject) => {
  socket.timeout(5000).emit('newChannel', { name }, (err, response) => {
    if (err) {
      return reject(err);
    }

    return (resolve(response));
  });
});

export const removeChannel = (id) => new Promise((resolve, reject) => {
  socket.timeout(5000).emit('removeChannel', { id }, (err) => {
    if (err) return reject(err);
    return resolve();
  });
});

export const renameChannel = (id, name) => new Promise((resolve, reject) => {
  socket.timeout(5000).emit('renameChannel', { id, name }, (err) => {
    if (err) return reject(err);
    return resolve();
  });
});
