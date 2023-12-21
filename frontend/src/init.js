// import { useDispatch } from 'react-redux';
// import { io } from 'socket.io-client';
// import filter from 'leo-profanity';

// const runApp = () => {
//   const rus = filter.getDictionary('ru');
//   const eng = filter.getDictionary('eng');
//   filter.addDictionary('engRus', [...rus, ...eng]);
//   filter.loadDictionary('engRus');

//   const dispatch = useDispatch();

//   const socket = io();

//   socket.on('newMessage', (payload) => {
//     console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
//     dispatch(addMessage(payload));
//   });

//   socket.on('newChannel', (payload) => {
//     console.log(payload); // { id: 6, name: "new channel", removable: true }
//     dispatch(addChannel(payload));
//     dispatch(setActive(payload.id));
//   });

//   socket.on('renameChannel', (payload) => {
//     console.log(payload); // { id: 7, name: "new name channel", removable: true }
//     dispatch(renameChannel(payload));
//   });

//   socket.on('removeChannel', (payload) => {
//     console.log(payload); // { id: 6 };
//     dispatch(removeChannel(payload));
//   });
// };

// export default runApp;
