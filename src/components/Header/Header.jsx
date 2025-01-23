import './Header.css';
import NRFLogo from '../.././content/assets/nrf-logo.svg';

const Header = ({ toggleControl }) => {
  return (
    <header>
      <img
        width="250"
        height="50"
        className="logo"
        alt="NRF Logo"
        src={NRFLogo}
      />
      <button
        className="header-button"
        onClick={() => toggleControl('selection')}
      >
        Filter By
      </button>
    </header>
  );
};

export default Header;
