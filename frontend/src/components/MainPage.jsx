import LoginContext from '../contexts/loginContext';
import { useContext } from 'react';

export default function MainPage() {
  const { token } = useContext(LoginContext);
  if (!token) window.location.href = '/login';
  return <div>main page</div>;
}