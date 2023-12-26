import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import LoginContext from '../contexts/loginContext';
import routes from '../routes';
import { setChannels, setActive } from '../slices/channelsSlice';

import Messages from './Messages';
import { setMessages } from '../slices/messagesSlice';
import ChatInput from './ChatInput';
import LeftPanel from './LeftPanel';

const MainPage = () => {
  const { token, username } = useContext(LoginContext);
  console.log(token);
  const dispatch = useDispatch();

  useEffect(() => {
    const setData = async () => {
      try {
        const response = await axios.get(routes.getData(), {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);
        const { channels, messages, currentChannelId } = response.data;
        dispatch(setChannels(channels));
        dispatch(setActive(currentChannelId));
        dispatch(setMessages(messages));
      } catch (e) {
        console.log(e);
      }
    };

    setData();
  }, [dispatch, token]);

  return (
    <div className="chat__container">
      <div className="chat rounded shadow">
        <LeftPanel />
        <div className="right-panel d-flex flex-column h-100">
          <Messages />
          <ChatInput username={username} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
