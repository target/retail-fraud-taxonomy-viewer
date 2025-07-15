import './Header.css';
import './ColorPicker.css';
import NRFLogo from '../../content/assets/nrf-logo.svg';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  RiAddCircleLine, RiImportLine, RiArrowLeftLine,
  RiExportLine, RiDeleteBin5Line, RiEyeLine, RiPaletteLine,
  RiFilterFill, RiSettings5Fill, RiBarChartFill, RiRefreshFill
} from 'react-icons/ri';
import { handleExport } from '../ContentManager/ManageContentUtils';
import { Alert } from '../Alert/Alert';

const ToggleSwitch = ({ label, value, onToggle }) => (
  <div className="toggle-wrapper" onClick={() => onToggle(!value)}>
    <div className={`toggle-track ${value ? 'active' : ''}`}>
      <div className="toggle-thumb" />
    </div>
    <span className="toggle-label">{label}</span>
  </div>
);

const Header = ({
  toggleControl, onAddClick, onEditMode, onImportClick,
  onViewCustomContent, editStatus, editContent, onBackClick,
  addContent, onHideClick, hideStatus, onHideToggle, hideToggleStatus,
  onColorClick, onRiskScore, selectedTechnique, viewCustomMode, onSyncClick
}) => {
  const [isToggled, setIsToggled] = useState(editStatus);
  const [viewCustomContent, setViewCustomContent] = useState(viewCustomMode);
  const [fileData, setFileData] = useState(null);
  const [activeControl, setActiveControl] = useState(null);
  const [alertVal, setAlertVal] = useState('');
  const [alertHeading, setAlertHeading] = useState('');
  const [responseSubmit, setResponseSubmit] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);
  const [hide, setHide] = useState(hideStatus);
  const [showHidden, setShowHidden] = useState(hideToggleStatus);
  const fileInputRef = useRef();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showRiskScore, setShowRiskScore] = useState(false);
  const [riskScore, setRiskScore] = useState('');
  const iconContainerRef = useRef(null);

  const handleRiskScoreChange = (e) => {
    const val = e.target.value;
    setRiskScore(val);
    onRiskScore(val)
  };

  const handleAddClick = () => onAddClick('add');

  const handleSynclick = () => onSyncClick('sync')

  const handleBackClick = () => {
    setViewCustomContent(false);
    onViewCustomContent(false);
    setIsToggled(false);
    onBackClick('back');
  };

  const handleImportClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          setFileData(parsed);
          onImportClick(parsed);
          setViewCustomContent(true);
          onViewCustomContent(true);
        } catch (err) {
          console.error('Invalid JSON:', err);
        }
      };
      reader.readAsText(file);
    }
  };

  const toggleViewContent = () => {
    const newValue = !viewCustomContent;
    setViewCustomContent(newValue);
    onViewCustomContent(newValue);
  };

  const deleteCustomContent = () => {
    try {
      localStorage.removeItem('technique_table');
      localStorage.removeItem('techniques');
      setViewCustomContent(false);
      onViewCustomContent(false);
      setResponseSubmit(true);
      setAlertVal('Data deleted successfully');
      setTimeout(() => setResponseSubmit(false), 2000);
    } catch (error) {
      setAlertHeading(error.message || 'Error');
      setShowFailAlert(true);
      setAlertVal('Data delete failed');
      setTimeout(() => setShowFailAlert(false), 2000);
    }
  };

  // Hide on outside click on anywhere on browser
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        iconContainerRef.current &&
        !iconContainerRef.current.contains(event.target)
      ) {
        setActiveControl(false);
        setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleHide = (iconName) => {
    if (iconName === 'RiEyeLine') {
      const newValue = !hide;
      setHide(newValue);
      onHideClick(newValue);
      onViewCustomContent(true);
    } else if (iconName === 'RiPaletteLine') {
      setShowPopup(!showPopup);
    } else if (iconName === 'RiBarChartFill') {
      const storedTechniques = JSON.parse(localStorage.getItem('techniques')) || [];
      const matchedTechnique = storedTechniques.find(item => item.name === selectedTechnique);
      setRiskScore(matchedTechnique?.risk_score)
      setShowRiskScore((prev) => !prev);
    }
  };

  const handleColorClick = (color) => {
    onColorClick(color);
    setSelectedColor(color);
  };

  useEffect(() => setIsToggled(editStatus), [editStatus]);
  useEffect(() => setHide(hideStatus), [hideStatus]);
  useEffect(() => setShowHidden(hideToggleStatus), [hideToggleStatus]);
  useEffect(() => setViewCustomContent(viewCustomMode), [viewCustomMode]);

  useEffect(() => {
    const storedTechniques = JSON.parse(localStorage.getItem('techniques')) || [];
    const matchedTechnique = storedTechniques.find(item => item.name === selectedTechnique);
    setRiskScore(matchedTechnique?.risk_score)
  },
    [selectedTechnique]);

  const ColorPopup = ({ showPopup }) => {
    const colors = [
      // Dark Reds & Oranges
      '#8B0000', '#A52A2A', '#B22222', '#CD5C5C',
      // Dark Yellows & Golds
      '#8B4513', '#B8860B', '#DAA520', '#A67C00',
      // Dark Greens
      '#006400', '#2F4F4F', '#228B22', '#556B2F',
      // Dark Blues
      '#00008B', '#003366', '#4682B4', '#1E3A5F',
      // Dark Purples & Pinks
      '#800080', '#4B0082', '#6A0DAD', '#8A2BE2',
      // Dark Browns & Earth Tones
      '#8B4513', '#D2691E', '#6B4226', '#8B3A3A',
      // Dark Aqua / Cyan / Teal
      '#008B8B', '#5F9EA0', '#4682B4', '#2F4F4F',
      // Transaparent
      'rgba(0, 0, 0, 0)',
      'rgba(0, 0, 0, 1)'
    ];

    return (
      showPopup && (
        <div className="popup">
          <div className="color-grid">
            {colors.map((color, index) => {
              const NO_COLOR = 'rgba(0, 0, 0, 0)';
              const REMOVE_COLOR = 'rgba(0, 0, 0, 1)';
              const isSpecialColor = color === NO_COLOR || color === REMOVE_COLOR;

              // Add extra spacing between the special color boxes
              const isLastSpecial = color === REMOVE_COLOR;
              const isFirstSpecial = color === NO_COLOR;

              return (
                <div
                  key={index}
                  className="color-square"
                  style={{
                    backgroundColor: color,
                    border: color === selectedColor ? '2px solid white' : '2px solid #555',
                    display: isSpecialColor ? 'flex' : 'block',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: isSpecialColor ? 'white' : 'transparent',
                    textAlign: 'center',
                    minWidth: isSpecialColor ? '55px' : '30px',
                    minHeight: isSpecialColor ? '55px' : '30px',
                    marginLeft: isLastSpecial ? '50px' : '0',
                    marginBottom: '8px', // General spacing
                  }}
                  onClick={() => handleColorClick(color)}
                >
                  {color === NO_COLOR && 'No Color'}
                  {color === REMOVE_COLOR && 'Remove All'}
                </div>
              );
            })}


          </div>
        </div>
      )
    );
  };

  return (
    <header>
      <img width="250" height="50" className="logo" alt="NRF Logo" src={NRFLogo} />
      <span>Dev Build</span>
       <div className="header-controls">
          <button className="header-button" onClick={handleSynclick}>
            <RiRefreshFill style={{ fontSize: '40px' }}/>
            Sync with NRF Content
          </button>
      </div>

      {showFailAlert && <Alert classStyle="alert-fail" heading={alertHeading} value={alertVal} />}
      {responseSubmit && <Alert classStyle="alert-success" heading={alertHeading} value={alertVal} />}

      {!editContent && !addContent && (
        <div className="header-controls">
          <button className="header-button" onClick={handleAddClick}>
            <RiAddCircleLine style={{ fontSize: '30px' }} />
            Add Technique
          </button>

          <button className="header-button" onClick={handleImportClick}>
            <RiImportLine style={{ fontSize: '30px' }} />
            Import Data
          </button>

          <div style={{ position: 'relative' }} ref={iconContainerRef}>
            <button className="header-button" onClick={() => setActiveControl(!activeControl)}>
              <RiSettings5Fill style={{ fontSize: '30px' }} />
              Technique Controls
            </button>
            {activeControl && (
              <div style={{
                position: 'absolute',
                top: '50px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: '#333',
                padding: '10px',
                borderRadius: '6px',
                zIndex: 10,
              }}>
                <RiEyeLine
                  title='Hide/Unhide'
                  style={{ fontSize: '24px', color: 'white', cursor: 'pointer' }}
                  onClick={() => toggleHide('RiEyeLine')}
                />
                <RiPaletteLine
                  title='Coloring'
                  style={{ fontSize: '24px', color: 'white', cursor: 'pointer' }}
                  onClick={() => toggleHide('RiPaletteLine')}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <RiBarChartFill
                    title='Risk score'
                    style={{ fontSize: '24px', color: 'white', cursor: 'pointer' }}
                    onClick={() => toggleHide('RiBarChartFill')}
                  />
                  {showRiskScore && (
                    <input
                      type="number"
                      value={riskScore}
                      onChange={handleRiskScoreChange}
                      placeholder="Score"
                      style={{ marginLeft: '8px', width: '60px', height: '20px' }}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          <div className="toggle-group">
            <ToggleSwitch
              label={isToggled ? 'EDIT ON' : 'EDIT OFF'}
              value={isToggled}
              onToggle={(v) => {
                setIsToggled(v);
                onEditMode(v);
              }}
            />
            <ToggleSwitch
              label={showHidden ? 'SHOW HIDDEN' : 'HIDE'}
              value={showHidden}
              onToggle={(v) => {
                setShowHidden(v);
                onHideToggle(v);
              }}
            />

            {(localStorage.getItem('technique_table') || fileData) && (
              <>
                <ToggleSwitch
                  label={viewCustomContent ? 'Custom Content' : 'NRF Content'}
                  value={viewCustomContent}
                  onToggle={toggleViewContent}
                />

                <button className="header-button" onClick={handleExport}>
                  <RiExportLine style={{ fontSize: '30px' }} />
                  Export Custom Content
                </button>

                <button className="header-button" onClick={deleteCustomContent}>
                  <RiDeleteBin5Line style={{ fontSize: '30px' }} />
                  Delete Custom Content
                </button>
              </>
            )}

            <button className="header-button" onClick={() => toggleControl('selection')}>
              <RiFilterFill style={{ fontSize: '30px' }} />
              Filter By
            </button>
          </div>
        </div>
      )}

      {(editContent || addContent) && (
        <div className="header-controls">
          <button className="header-button" onClick={handleBackClick}>
            <RiArrowLeftLine style={{ fontSize: '30px' }} />
            Back
          </button>

          <button className="header-button" onClick={handleExport}>
            <RiExportLine style={{ fontSize: '30px' }} />
            Export Custom Content
          </button>
        </div>
      )}

      <ColorPopup showPopup={showPopup} togglePopup={() => setShowPopup(!showPopup)} />
    </header>
  );
};

export default Header;
