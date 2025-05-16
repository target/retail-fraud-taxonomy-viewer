import './Header.css';
import './ColorPicker.css';
import NRFLogo from '../../content/assets/nrf-logo.svg';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  RiAddCircleLine, RiImportLine, RiArrowLeftLine,
  RiExportLine, RiDeleteBin5Line, RiEyeLine, RiPaletteLine,
  RiFilterFill, RiSettings5Fill
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
  addContent, onHideClick, hideStatus, onHideToggle, hideToggleStatus, onColorClick
}) => {
  const [isToggled, setIsToggled] = useState(editStatus);
  const [viewCustomContent, setViewCustomContent] = useState(false);
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

  const controls = {
    technique: [
      { icon: RiEyeLine, name: 'RiEyeLine' },
      { icon: RiPaletteLine, name: 'RiPaletteLine' },
    ],
  };

  const toggleHide = (iconName) => {
    if (iconName === 'RiEyeLine') {
      const newValue = !hide;
      setHide(newValue);
      onHideClick(newValue);
    } else if (iconName === 'RiPaletteLine') {
      setShowPopup(!showPopup);
    }
  };

  useEffect(() => setIsToggled(editStatus), [editStatus]);
  useEffect(() => setHide(hideStatus), [hideStatus]);
  useEffect(() => setShowHidden(hideToggleStatus), [hideToggleStatus]);

  const toggleEditMode = useCallback((value) => {
    setIsToggled(value);
    onEditMode(value);
  }, [onEditMode]);

  const toggleShowHidden = useCallback((value) => {
    setShowHidden(value);
    onHideToggle(value);
  }, [onHideToggle]);

  const toggleViewContent = () => {
    const newValue = !viewCustomContent;
    setViewCustomContent(newValue);
    onViewCustomContent(newValue);
  };

  const handleAddClick = () => {
    onAddClick('add');
  };

  const handleColorClick = (color) => {
    onColorClick(color);
    setSelectedColor(color)
  }

  const handleBackClick = () => {
    setViewCustomContent(false);
    onViewCustomContent(false);
    setIsToggled(false);
    onBackClick('back');
  };

  const handleImportClick = () => fileInputRef.current.click();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result);
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

  const deleteCustomContent = () => {
    try {
      localStorage.removeItem('technique_table');
      localStorage.removeItem('techniques');
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
       'rgba(0, 0, 0, 0)'
    ];
    
  return (
    showPopup && (
      <div className="popup">
        <div className="color-grid">
          {colors.map((color, index) => (
            <div
              key={index}
              className="color-square"
              style={{
                backgroundColor: color,
                border: color === selectedColor ? '2px solid white' : '2px solid #555',
                display: color === 'rgba(0, 0, 0, 0)' ? 'flex' : 'block',
                justifyContent: 'center',
                alignItems: 'center',
                color: color === 'rgba(0, 0, 0, 0)' ? 'white' : 'transparent',
                textAlign: 'center',
                minWidth: color === 'rgba(0, 0, 0, 0)' ? '50px' : '30px',
                minHeight: color === 'rgba(0, 0, 0, 0)' ? '50px' : '30px',
              }}
              onClick={() => handleColorClick(color)}
            >
              {color === 'rgba(0, 0, 0, 0)' && 'No Color'}
            </div>
          ))}
        </div>
      </div>
    )
  );
};

  return (
    <header>
      <img width="250" height="50" className="logo" alt="NRF Logo" src={NRFLogo} />
      <span>Dev Build</span>

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

          <div style={{ position: 'relative' }}>
            <button className="header-button" onClick={() => setActiveControl(!activeControl)}>
              <RiSettings5Fill style={{ fontSize: '30px' }} />Technique Controls

            </button>
            {activeControl && (
              <div style={{
                position: "absolute",
                top: "50px",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                zIndex: 10,
              }}>
                {controls.technique.map((control, idx) => (
                  <control.icon
                    key={idx}
                    style={{ fontSize: '24px', color: 'white' }}
                    onClick={() => toggleHide(control.name)}
                  />
                ))}
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
              onToggle={toggleEditMode}
            />

            <ToggleSwitch
              label={showHidden ? 'SHOW HIDDEN' : 'HIDE'}
              value={showHidden}
              onToggle={toggleShowHidden}
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
