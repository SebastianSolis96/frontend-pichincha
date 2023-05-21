import pichinchaLogo from '../assets/MainPichincha.svg';

import './Header.css';

const Header = () => {
  return (
    <header className='header'>
      <img src={pichinchaLogo} className="logo" alt="Banco Pichincha logo" />
    </header>
  )
};

export default Header;
