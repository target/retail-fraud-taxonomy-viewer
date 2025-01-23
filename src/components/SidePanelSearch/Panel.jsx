import './SidePanel.css';
import { FaTimes } from 'react-icons/fa';
import {
  fetchAllMitigations,
  fetchAllSchemes,
  formatData,
} from '../../utils/dataMap';

const MITIGATION = 'mitigation';
const SCHEMES = 'schemes';
const SHOW_ALL = 'Show All';

const SidePanel = ({ onFilterChange, onClose }) => {
  const handleFilterChange = (filterValue, filterType) => {
    onFilterChange(filterValue, filterType);
  };

  const mitigations = fetchAllMitigations();
  const schemes = fetchAllSchemes();

  return (
    <div className="side-panel">
      <div className="side-panel-header">
        <FaTimes
          className="close-icon"
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '10px' }}
          data-testid="close-button"
        />
        <button
          className="show-all-button"
          onMouseEnter={() => handleFilterChange(SHOW_ALL, SHOW_ALL)}
        >
          Show All
        </button>
      </div>
      <div className="filter-section">
        <h3>Mitigation ({mitigations.length})</h3>
        <div className="filter-list">
          {mitigations.map((mitigation, index) => (
            <button
              key={index}
              onMouseEnter={() => handleFilterChange(mitigation, MITIGATION)}
            >
              {formatData(mitigation)}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-section">
        <h3>Schemes ({schemes.length})</h3>
        <div className="filter-list">
          {schemes.map((scheme, index) => (
            <button
              key={index}
              onMouseEnter={() => handleFilterChange(scheme, SCHEMES)}
            >
              {scheme}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
