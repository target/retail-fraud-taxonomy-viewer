import './SidePanel.css';
import { FaTimes } from 'react-icons/fa';
import {
  fetchAllMitigations,
  fetchAllSchemes,
  fetchAllDetections
} from '../../utils/dataMap';
import { useState } from 'react';

const MITIGATION = 'mitigation';
const SCHEMES = 'schemes';
const DETECTION = 'detection';
const RISK_SCORE = 'risk_score';
const SHOW_ALL = 'Show All';

const SidePanel = ({ onFilterChange, onClose, viewCustomMode }) => {
  const handleFilterChange = (filterValue, filterType) => {
    onFilterChange(filterValue, filterType);
  };

  const mitigations = fetchAllMitigations(viewCustomMode);
  const schemes = fetchAllSchemes(viewCustomMode);
  const detections = fetchAllDetections(viewCustomMode);
  const risk_score = ['<= 50', '> 50']
  const [minRiskScore, setMinRiskScore] = useState(0);
  const [maxRiskScore, setMaxRiskScore] = useState(100);

  const handleMinRiskScoreChange = (e) => {
    const val = e.target.value;
    setMinRiskScore(val)
  };

  const handleMaxRiskScoreChange = (e) => {
    const val = e.target.value;
    setMaxRiskScore(val)
  };

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
          onClick={() => handleFilterChange(SHOW_ALL, SHOW_ALL)}
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
              onClick={() => handleFilterChange(mitigation, MITIGATION)}
            >
              {mitigation}
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
              onClick={() => handleFilterChange(scheme, SCHEMES)}
            >
              {scheme}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-section">
        <h3>Detection ({detections.length})</h3>
        <div className="filter-list">
          {detections.map((detection, index) => (
            <button
              key={index}
              onClick={() => handleFilterChange(detection, DETECTION)}
            >
              {detection}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-section">
        <h3>Risk Score</h3>
        <div className="filter-list">
          Enter Score Range
          <input
            type="number"
            value={minRiskScore}
            onChange={handleMinRiskScoreChange}
            placeholder="Min Score"
            style={{ marginLeft: '8px', width: '70px', height: '20px' }}
          />
          <input
            type="number"
            value={maxRiskScore}
            onChange={handleMaxRiskScoreChange}
            placeholder="Max Score"
            style={{ marginLeft: '25px', width: '70px', height: '20px' }}
          />
          <button
            className="search-button"
            onClick={() => handleFilterChange({minScore: minRiskScore, maxScore: maxRiskScore}, RISK_SCORE)}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
