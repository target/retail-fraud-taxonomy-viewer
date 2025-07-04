import { useState, useEffect } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import './ManageContent.css';
import { fetchAllTechniques, fetchTechnique, dataArray, getUniqueTechniques } from '../../utils/dataMap';
import { transformData, transformKeyValue, transformReference, formatDetails, formatFields, formatReferences, handleNewTactic, addTechniqueIfNotExists, consolidateData } from './ManageContentUtils';
import { RiAddCircleLine, RiCheckboxFill, RiDeleteBinLine } from 'react-icons/ri';
import { Alert } from '../Alert/Alert'

const ManageContent = (props) => {
  const [fields, setFields] = useState({
    description: [{ value: '' }],
    tactics: [{ value: '' }],
    schemes: [{ value: '' }],
    sub_techniques: [{ value: '' }],
  });

  const [keyValuePairs, setKeyValuePairs] = useState({
    mitigation: [{ key: '', values: [''], implemented: false }],
    detection: [{ key: '', values: [''] , implemented: false}],
    references: [{ key: '', values: [''], implemented: false}],
  });

  const [openSections, setOpenSections] = useState({
    technique: true,
    mitigation: true,
    detection: true,
    references: true,
  });

  const [techniqueName, setTechniqueName] = useState(props.technique || '');
  const [allTechniques, setAllTechniques] = useState([]);
  const [code, setCode] = useState('');
  const [parentTechnique, setParentTechnique] = useState('');
  const [alertVal, setAlertVal] = useState('')
  const [showFailAlert, setShowFailAlert] = useState(false)
  const [alertHeading, setAlertHeading] = useState('')
  const [responseSubmit, setResponseSubmit] = useState(false)
  const [selectedTechnique, setSelectedTechnique] = useState('');
  const options = getUniqueTechniques();

  const handleCloneFromChange = (event) => {
    const value = event.target.value;
    setSelectedTechnique(value);
  };

  const resetForm = () => {
    setCode('');
    setTechniqueName('');
    setParentTechnique('');

    setFields({
      description: [{ value: '' }],
      tactics: [{ value: '' }],
      schemes: [{ value: '' }],
      sub_techniques: [{ value: '' }],
    })

    setKeyValuePairs({
      mitigation: [{ key: '', values: [''] , implemented: false}],
      detection: [{ key: '', values: [''] , implemented: false}],
      references: [{ key: '', values: [''], implemented: false }],
    })
  }

  useEffect(() => {
    if (props.technique || selectedTechnique) {
      const fetchDetails = async () => {
        let techniqueInfo = {};
        let techniqueName = props.technique || selectedTechnique

        if (techniqueName) {
          if (props.viewCustomMode || props.addContent) {
            techniqueInfo = JSON.parse(localStorage.getItem('techniques')).find(item =>
              item.name === techniqueName
            );
          } else {
            techniqueInfo = await fetchTechnique(techniqueName);
          }

          if (techniqueInfo) {
            setCode(techniqueInfo.code);
            setTechniqueName(techniqueInfo.name);
            setParentTechnique(techniqueInfo.parent_technique);

            setFields({
              description: transformData(techniqueInfo.technique_description || ['']),
              tactics: transformData(techniqueInfo.tactics.length === 0 ? [''] : techniqueInfo.tactics),
              schemes: transformData(techniqueInfo.schemes.length === 0 ? [''] : techniqueInfo.schemes),
              sub_techniques: transformData(techniqueInfo.sub_techniques.length === 0 ? [''] : techniqueInfo.sub_techniques),
            });

            setKeyValuePairs({
              mitigation: transformKeyValue(techniqueInfo.mitigation),
              detection: transformKeyValue(techniqueInfo.detection),
              references: transformReference(techniqueInfo.references),
            });
          }
        }
      }
      fetchDetails();
    } else {
      resetForm()
    }
  }, [props.technique, selectedTechnique]);

  // Fetch all techniques on component mount
  useEffect(() => {
    const fetchTechniques = async () => {
      const fetchedTechniques = await fetchAllTechniques();
      setAllTechniques(fetchedTechniques);

      if (!props.importContent && !props.viewCustomMode && !localStorage.getItem('technique_table')) {
        localStorage.setItem('technique_table', JSON.stringify(fetchedTechniques));
        localStorage.setItem('techniques', JSON.stringify(dataArray));
      }
    };

    fetchTechniques();
  }, []);

  // Handle adding/removing fields, toggling sections, etc.
  const addField = (fieldName) => {
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: [...prevFields[fieldName], { value: '' }],
    }));
  };

  const removeField = (fieldName, index) => {
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: prevFields[fieldName].filter((_, i) => i !== index),
    }));
  };

  const handleFieldChange = (fieldName, index, event) => {
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: prevFields[fieldName].map((field, i) =>
        i === index ? { ...field, value: event.target.value } : field
      ),
    }));
  };

  const handleToggle = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle adding new value to key-value pair
  const addValueField = (type, keyIndex) => {
    const newKeyValuePairs = [...keyValuePairs[type]];
    newKeyValuePairs[keyIndex].values.push('');
    setKeyValuePairs((prev) => ({
      ...prev,
      [type]: newKeyValuePairs,
    }));
  };

  // Handle removing a value from a key-value pair
  const removeValueField = (type, keyIndex, valueIndex) => {
    const newKeyValuePairs = [...keyValuePairs[type]];
    newKeyValuePairs[keyIndex].values = newKeyValuePairs[keyIndex].values.filter((_, i) => i !== valueIndex);
    setKeyValuePairs((prev) => ({
      ...prev,
      [type]: newKeyValuePairs,
    }));
  };


  // Add key-value pair
  const addKeyValuePair = (type) => {
    setKeyValuePairs((prev) => ({
      ...prev,
      [type]: [...prev[type], { key: '', values: [''] }],
    }));
  };


  // Remove key-value pair
  const removeKeyValuePair = (type, index) => {
    setKeyValuePairs((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleKeyValueChange = (type, index, field, event) => {
    const updatedPairs = keyValuePairs[type].map((pair, i) =>
      i === index
        ? {
          ...pair,
          [field]: event.target.value,
        }
        : pair
    );
    setKeyValuePairs({
      ...keyValuePairs,
      [type]: updatedPairs,
    });
  };

  // Handle change in key input
  const handleKeyChange = (type, index, event) => {
    const newKeyValuePairs = [...keyValuePairs[type]];
    newKeyValuePairs[index].key = event.target.value;
    setKeyValuePairs((prev) => ({
      ...prev,
      [type]: newKeyValuePairs,
    }));
  };

  // Handle change in value input
  const handleValueChange = (type, keyIndex, valueIndex, event) => {
    const newKeyValuePairs = [...keyValuePairs[type]];
    newKeyValuePairs[keyIndex].values[valueIndex] = event.target.value;
    setKeyValuePairs((prev) => ({
      ...prev,
      [type]: newKeyValuePairs,
    }));
  };

  const handleImplementedChange = (type, index, event) => {
    const newKeyValuePairs = [...keyValuePairs[type]];
    newKeyValuePairs[index].implemented = event.target.checked;
    setKeyValuePairs((prev) => ({
      ...prev,
      [type]: newKeyValuePairs,
    }));
  };

  // Function for rendering key-value pairs
  const addKeyValue = (type) => {
    return (
      <div style={{ marginBottom: '20px' }}>
        {keyValuePairs[type]?.map((pair, keyIndex) => (
          <div key={keyIndex} className='box-section'>
  
            {/* Remove Key-Value Pair Button */}
            <RiDeleteBinLine
              className='remove-key-value-pair'
              onClick={() => removeKeyValuePair(type, keyIndex)}
            />
  
            {/* Key Input */}
            <div style={{ display: 'flex', marginBottom: '10px' }}>
              <label htmlFor={`key-${keyIndex}`} style={{ color: 'white' }}>
                {type === 'references' ? 'Source:' : 'Type: '}
              </label>
              <input
                type="text"
                id={`key-${keyIndex}`}
                value={pair.key}
                onChange={(e) => handleKeyChange(type, keyIndex, e)}
                placeholder={type === 'references' ? `Source ${keyIndex + 1}` : `Type ${keyIndex + 1}`}
                className='key-text'
              />
  
              {/* Checkbox for non-reference types */}
              {type !== 'references' && (
                <div style={{ marginLeft: '40px' }}>
                  Implemented?
                  <input
                    type="checkbox"
                    checked={pair.implemented || false}
                    onChange={(e) => handleImplementedChange(type, keyIndex, e)}
                    style={{
                      transform: 'scale(2)',
                      accentColor: 'green',
                      marginLeft: '10px',
                      cursor: 'pointer'
                    }}
                  />
                </div>
              )}
            </div>
  
            {/* Value Inputs */}
            <div style={{ marginBottom: '10px' }}>
              {pair?.values?.map((value, valueIndex) => (
                <div key={valueIndex} style={{ display: 'flex', marginBottom: '10px' }}>
                  <label htmlFor={`value-${valueIndex}`} style={{ color: 'white' }}>
                    Info:
                  </label>
                  <textarea
                    type="text"
                    id={`value-${valueIndex}`}
                    value={value}
                    onChange={(e) => handleValueChange(type, keyIndex, valueIndex, e)}
                    placeholder={`Info ${valueIndex + 1}`}
                    className='text-area-box'
                  />
  
                  {/* Remove Value Button */}
                  {pair?.values?.length > 1 && (
                    <RiDeleteBinLine
                      className='remove-value'
                      onClick={() => removeValueField(type, keyIndex, valueIndex)}
                    />
                  )}
                </div>
              ))}
            </div>
  
            {/* Add Value Button */}
            <RiAddCircleLine
              className='add-value'
              onClick={() => addValueField(type, keyIndex)}
            />
          </div>
        ))}
  
        {/* Add Key-Value Pair Button */}
        <RiAddCircleLine
          className='add-key-value-pair'
          onClick={() => addKeyValuePair(type)}
        />
      </div>
    );
  };

  // Format the data to be saved
  const formatJSON = () => {
    let requestBody = {
      code,
      name: techniqueName,
      parent_technique: parentTechnique,
      tactics: formatFields(fields.tactics),
      schemes: formatFields(fields.schemes),
      sub_techniques: formatFields(fields.sub_techniques),
      technique_description: formatFields(fields.description),
      mitigation: formatDetails(keyValuePairs.mitigation),
      detection: formatDetails(keyValuePairs.detection),
      references: formatReferences(keyValuePairs.references),
    };
    return requestBody;
  };

  const handleSave = async () => {
    try {
      let jsonContent = formatJSON();

      let techniqueName = jsonContent.name
      let tactics = jsonContent.tactics

      let addedTechnique = {}

      if (props.addContent) {
        handleNewTactic(techniqueName, tactics)
        let inputJSON = localStorage.getItem('technique_table') ? JSON.parse(localStorage.getItem('technique_table')) : [];
        addedTechnique = addTechniqueIfNotExists(inputJSON, tactics, techniqueName)
        localStorage.setItem('technique_table', JSON.stringify(consolidateData(addedTechnique)));
      }

      // Now, update the localStorage based on techniqueName
      let dataMapStorage = localStorage.getItem('techniques');
      dataMapStorage = dataMapStorage ? JSON.parse(dataMapStorage) : [];

      const techniqueExists = dataMapStorage.some(item => item.name.toLowerCase() === techniqueName.toLowerCase());

      if (techniqueExists) {
        // Update existing technique in localStorage
        const updatedDataMapStorage = dataMapStorage.map((item) => {
          if (item.name.toLowerCase() === techniqueName.toLowerCase()) {
            return {
              ...item,
              ...jsonContent
            };
          }
          return item;
        });
        localStorage.setItem('techniques', JSON.stringify(updatedDataMapStorage));
      } else {
        dataMapStorage.push(jsonContent);
        localStorage.setItem('techniques', JSON.stringify(dataMapStorage));
      }

      setResponseSubmit(true)
      setAlertVal('Data saved successfully')
      props.onContentSubmit(techniqueName)
      setTimeout(() => {
        setResponseSubmit(false)
      }, 2000)
    } catch (error) {
      setAlertHeading(error)
      setShowFailAlert(true)
      setAlertVal('Data save failed')
      setTimeout(() => {
        setShowFailAlert(false)
      }, 2000)
    }
  };

  const handleCancelClick = () => {
    props.onViewCustomContent(false);
    props.onBackClick('back');
  };
  return (
    <div>
      {/* Collapsible Technique Section */}
      <section className="collapsible-section1">
        <div>
          {showFailAlert && (
            <Alert
              classStyle="alert-fail"
              heading={alertHeading}
              value={alertVal}
            />
          )}
          {responseSubmit && (
            <Alert
              classStyle="alert-success"
              heading={alertHeading}
              value={alertVal}
            />
          )}
          {props.addContent && (
            <div style={{ paddingBottom: '20px' }}>
              <label htmlFor="clone-from" style={{ color: 'white', fontSize: '20px' }}>Clone From:  </label>
              <select id="clone-from" value={selectedTechnique} onChange={handleCloneFromChange} style={{ fontSize: '20px' }}>
                <option value="">-- Select Technique--</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          )}
          <div
            className={`Collapsible__trigger1 ${openSections.technique ? 'open' : ''}`}
            onClick={() => handleToggle('technique')}
          >
            <h4>Technique Description</h4>
            {openSections.technique ? (
              <FaChevronUp className="collapse-icon" />
            ) : (
              <FaChevronDown className="collapse-icon" />
            )}
          </div>

          {openSections.technique && (
            <div className="collapsible-details1">
              <form>
                <div>
                  <label htmlFor="name" style={{ color: 'white', marginRight: '5px' }}>
                    Name:
                  </label>
                  <input type="text" id="name" placeholder="Enter Name" className='key-text' value={techniqueName}
                    onChange={(e) => setTechniqueName(e.target.value)} disabled={props.technique !== null} />
                </div>
                <div>
                  <label htmlFor="name" style={{ color: 'white', marginRight: '5px' }}>
                    Code:
                  </label>
                  <input type="text" id="name" placeholder="Enter Code" className='key-text' value={code}
                    onChange={(e) => setCode(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="name" style={{ color: 'white', marginRight: '5px' }}>
                    Parent Technique:
                  </label>
                  <input type="text" id="name" placeholder="Enter Parent Technique (if any)" className='key-text' value={parentTechnique}
                    onChange={(e) => setParentTechnique(e.target.value)} />
                </div>

                {/* Description Section with Box Styling */}
                <div
                  className='box-section'
                >
                  <h4 style={{ color: 'white' }}>Description</h4>
                  {fields.description.map((field, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', width: '100%' }}>
                      <textarea
                        value={field.value}
                        onChange={(e) => handleFieldChange('description', index, e)}
                        placeholder={`Description ${index + 1}`}
                        className="text-area-box"
                      />
                      {fields.description.length > 1 && (
                        <RiDeleteBinLine
                          className="remove-value"
                          aria-label="description"
                          onClick={() => removeField('description', index)}
                        />
                      )}
                    </div>
                  ))}
                  <RiAddCircleLine className="add-value" onClick={() => addField('description')} />
                </div>

                {/* Tactics Section */}
                <div className="box-section">
                  <h4 style={{ color: 'white' }}>Tactics</h4>
                  {fields.tactics.map((field, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <input
                        value={field.value}
                        onChange={(e) => handleFieldChange('tactics', index, e)}
                        placeholder={`Tactic ${index + 1}`}
                        className="key-text"
                      />
                      {fields.tactics.length > 1 && (
                        <RiDeleteBinLine
                          className="remove-value-info"
                          onClick={() => removeField('tactics', index)}
                        />
                      )}
                    </div>
                  ))}
                  <RiAddCircleLine className="add-value" onClick={() => addField('tactics')} />
                </div>

                {/* Schemes Section */}
                <div className="box-section">
                  <h4 style={{ color: 'white' }}>Schemes</h4>
                  {fields.schemes.map((field, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <input
                        value={field.value}
                        onChange={(e) => handleFieldChange('schemes', index, e)}
                        placeholder={`Scheme ${index + 1}`}
                        className="key-text"
                      />
                      {fields.schemes.length > 1 && (
                        <RiDeleteBinLine
                          className="remove-value-info"
                          onClick={() => removeField('schemes', index)}
                        />
                      )}
                    </div>
                  ))}
                  <RiAddCircleLine className="add-value" onClick={() => addField('schemes')} />
                </div>

                {/* Sub-Techniques Section */}
                <div className="box-section">
                  <h4 style={{ color: 'white' }}>Sub-Techniques</h4>
                  {fields.sub_techniques.map((field, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <input
                        value={field.value}
                        onChange={(e) => handleFieldChange('sub_techniques', index, e)}
                        placeholder={`Sub-Technique ${index + 1}`}
                        className="key-text"
                      />
                      {fields.sub_techniques.length > 1 && (
                        <RiDeleteBinLine
                          className="remove-value-info"
                          onClick={() => removeField('sub_techniques', index)}
                        />
                      )}
                    </div>
                  ))}
                  <RiAddCircleLine className="add-value" onClick={() => addField('sub_techniques')} />
                </div>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* Collapsible Mitigation Section */}
      <section className="collapsible-section1">
        <div>
          <div
            className={`Collapsible__trigger1 ${openSections.mitigation ? 'open' : ''}`}
            onClick={() => handleToggle('mitigation')}
          >
            <h4>Mitigation</h4>
            {openSections.mitigation ? (
              <FaChevronUp className="collapse-icon" />
            ) : (
              <FaChevronDown className="collapse-icon" />
            )}
          </div>

          {openSections.mitigation && (
            <div className="collapsible-details1">
              <form>{addKeyValue('mitigation')}</form>
            </div>
          )}
        </div>
      </section>

      {/* Collapsible Detection Section */}
      <section className="collapsible-section1">
        <div>
          <div
            className={`Collapsible__trigger1 ${openSections.detection ? 'open' : ''}`}
            onClick={() => handleToggle('detection')}
          >
            <h4>Detection</h4>
            {openSections.detection ? (
              <FaChevronUp className="collapse-icon" />
            ) : (
              <FaChevronDown className="collapse-icon" />
            )}
          </div>

          {openSections.detection && (
            <div className="collapsible-details1">
              <form>{addKeyValue('detection')}</form>
            </div>
          )}
        </div>
      </section>

      {/* Collapsible References Section */}
      <section className="collapsible-section1">
        <div>
          <div
            className={`Collapsible__trigger1 ${openSections.references ? 'open' : ''}`}
            onClick={() => handleToggle('references')}
          >
            <h4>References</h4>
            {openSections.references ? (
              <FaChevronUp className="collapse-icon" />
            ) : (
              <FaChevronDown className="collapse-icon" />
            )}
          </div>

          {openSections.references && (
            <div className="collapsible-details1">
              <form>{addKeyValue('references')}</form>
            </div>
          )}

        </div>
      </section>
      <button className="save-button" type="submit" onClick={handleSave}>Save</button>
      <button className="save-button" type="cancel" onClick={handleCancelClick}>Cancel</button>
    </div>
  );
};

export default ManageContent;
