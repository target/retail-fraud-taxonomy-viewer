import './Header.css';
import NRFLogo from '../.././content/assets/nrf-logo.svg';
import React, { useState, useEffect, useRef } from 'react';
import { RiAddCircleLine, RiImportLine, RiArrowLeftLine} from 'react-icons/ri';

const Header = ({ toggleControl, onAddClick, onEditMode, onImportClick, onViewCustomContent, editStatus , editContent, onBackClick}) => {
  const [isToggled, setIsToggled] = useState(false);
  const fileInputRef = useRef();
  const [fileData, setFileData] = useState(null);
  const [viewCustomContent, setViewCustomContent] = useState(false);

    useEffect(() => {
      if (localStorage.getItem('technique_table')) {
        setViewCustomContent(true)
      }
    }, []);
  

  const handleToggle = () => {
    setIsToggled(!isToggled);
    onEditMode(!isToggled)
  };

  const handleViewContent = () => {
    setViewCustomContent(!viewCustomContent);
    onViewCustomContent(!viewCustomContent)
  };

  const handleButtonClick = () => {
    onAddClick('add')
  };

  const handleBackButtonClick = () => {
    onBackClick('back')
  };

  const handleImportClick = () => {
    fileInputRef.current.click(); // This opens the file picker
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;

        try {
          const parsed = JSON.parse(content);
          setFileData(parsed);
          onImportClick(parsed)
          setViewCustomContent(true)
          console.log("Parsed JSON:", parsed);
        } catch (err) {
          console.error("Invalid JSON:", err);
        }
      };



      reader.readAsText(file); // Read file as text
    }
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
      {/* {!editStatus && ( */}
      {!editContent && (
      <div className="header-controls">
        <button className="header-button" onClick={() => handleButtonClick()} style={{ display: 'flex', alignItems: 'center' }}>
          <RiAddCircleLine style={{ fontSize: '20px', marginRight: '5px' }} /> Add Technique
        </button>
        <button className="header-button" onClick={() => handleImportClick()} style={{ display: 'flex', alignItems: 'center' }}>
          <RiImportLine style={{ fontSize: '20px', marginRight: '5px' }} /> Import Data
        </button>

        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <div onClick={handleToggle} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          {/* Custom Toggle Slider */}
          <div
            style={{
              width: '50px',
              height: '25px',
              borderRadius: '25px',
              backgroundColor: isToggled ? 'green' : '#ccc',
              position: 'relative',
              transition: 'background-color 0.3s ease',
            }}
          >
            {/* Circle inside the toggle */}
            <div
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: 'white',
                position: 'absolute',
                top: '2px',
                left: isToggled ? 'calc(100% - 22px)' : '2px',
                transition: 'left 0.3s ease',  // Smooth transition for the toggle circle
              }}
            />
          </div>
          <span style={{ marginLeft: '10px' }}>{isToggled ? 'EDIT ON' : 'EDIT OFF'}</span>


        </div>
        {(localStorage.getItem('technique_table') || fileData) && (
          <div onClick={handleViewContent} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            {/* Custom Toggle Slider */}
            <div
              style={{
                width: '50px',
                height: '25px',
                borderRadius: '25px',
                backgroundColor: viewCustomContent ? 'green' : '#ccc',
                position: 'relative',
                transition: 'background-color 0.3s ease',
              }}
            >
              {/* Circle inside the toggle */}
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: '2px',
                  left: viewCustomContent ? 'calc(100% - 22px)' : '2px',
                  transition: 'left 0.3s ease',  // Smooth transition for the toggle circle
                }}
              />
            </div>
            <span style={{ marginLeft: '10px' }}>{viewCustomContent ? 'Custom Content' : 'NRF Content'}</span>
          </div>
        )}
        <button
          className="header-button"
          onClick={() => toggleControl('selection')}
        >
          Filter By
        </button>
      </div>
      )}

    {editContent && (
      <div className="header-controls">
        <button className="header-button" onClick={() => handleBackButtonClick()} style={{ display: 'flex', alignItems: 'center' }}>
          <RiArrowLeftLine style={{ fontSize: '20px', marginRight: '5px' }} /> Back
        </button>
        </div>
      )}
    </header>
  );
};

export default Header;
