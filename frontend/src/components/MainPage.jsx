import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import LoginContext from '../contexts/loginContext';
import routes from '../routes';

export default function MainPage() {
  const { token } = useContext(LoginContext);
  const [allChannels, setAllChannels] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [currentID, setCurrentID] = useState(0);

  if (!token) window.location.href = '/login';

  useEffect(() => {
    const setData = async () => {
      const response = await axios.get(routes.getData(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      const { channels, messages, currentChannelID } = response.data;
      setAllChannels(channels);
      setAllMessages(messages);
      setData(currentChannelID);
    };

    setData();
  }, []);

  return <div>{token}</div>;
}
