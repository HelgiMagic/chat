import { useContext, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LoginContext from '../contexts/loginContext';
import routes from '../routes';
import Channels from './Channels';
import { setChannels, setActive } from '../slices/channelsSlice';
import Messages from './Messages';
import { setMessages } from '../slices/messagesSlice';
import ChatInput from './ChatInput';
import { setActiveModal } from '../slices/modalSlice';

const MainPage = () => {
  const { t } = useTranslation();
  const { token, username } = useContext(LoginContext);
  const dispatch = useDispatch();

  const handleAddChannel = () => {
    dispatch(setActiveModal('add'));
  };

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
        <div className="left-panel bg-light border-end">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>{t('channels')}</b>
            <button
              type="button"
              className="p-0 text-primary btn btn-group-vertical"
              onClick={handleAddChannel}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <Channels />
        </div>
        <div className="right-panel d-flex flex-column h-100">
          <Messages />
          <ChatInput username={username} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
