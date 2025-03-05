import './Header.css';
import NRFLogo from '../.././content/assets/nrf-logo.svg';
import { RiAddCircleLine} from 'react-icons/ri';

const Header = ({ toggleControl, onAddClick }) => {
  const handleButtonClick = () => {
    onAddClick('add')
  };

  return (
    <header>
      <img
        width="250"
        height="50"
        className="logo"
        alt="NRF Logo"
        src={NRFLogo}
      />
      <span>Dev Build</span>
      <div className="header-controls">
        <button className="header-button" onClick={() => handleButtonClick()} style={{ display: 'flex', alignItems: 'center' }}>
         <RiAddCircleLine style={{fontSize: '20px', marginRight: '5px'}}/> Add Technique
        </button>
      <button
        className="header-button"
        onClick={() => toggleControl('selection')}
      >
        Filter By
      </button>
      </div>
    </header>
  );
};

export default Header;
