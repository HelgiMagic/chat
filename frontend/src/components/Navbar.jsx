import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import loginContext from '../contexts/loginContext';

const ExitButton = () => {
  const { t } = useTranslation();
  const { token, logOut } = useContext(loginContext);

  if (!token) return null;

  const handleClick = () => {
    logOut();
  };

  return (
    <button type="button" className="btn btn-primary" onClick={handleClick}>
      {t('exit')}
    </button>
  );
};

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          {t('projectName')}
        </a>
        <ExitButton />
      </div>
    </nav>
  );
};

export default Navbar;
