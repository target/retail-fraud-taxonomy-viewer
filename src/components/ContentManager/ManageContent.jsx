import { useState, useEffect } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import './ManageContent.css';
import { fetchAllTechniques, fetchTechnique, dataMap, dataArray } from '../../utils/dataMap';
import { transformData, transformKeyValue, transformReference, formatDetails, formatFields, formatReferences } from './ManageContentUtils';
import { RiAddCircleLine, RiDeleteBinLine } from 'react-icons/ri';
import { Alert } from '../Alert/Alert'

const ManageContent = (props) => {
  const [fields, setFields] = useState({
    description: [{ value: '' }],
    tactics: [{ value: '' }],
    schemes: [{ value: '' }],
    sub_techniques: [{ value: '' }],
  });

  const [keyValuePairs, setKeyValuePairs] = useState({
    mitigation: [{ key: '', values: [''] }],
    detection: [{ key: '', values: [''] }],
    references: [{ key: '', values: [''] }],
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
  const [requestSubmit, setResponseSubmit] = useState(false)

  useEffect(() => {
    if (props.technique) {
      const fetchDetails = async () => {
        let techniqueInfo = {};

        if (props.viewCustomMode) {
          techniqueInfo = JSON.parse(localStorage.getItem('techniques')).find(item =>
            item.name === props.technique
          );
        } else {
          techniqueInfo = await fetchTechnique(props.technique);
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
      };

      fetchDetails();
    }
  }, [props.technique]);

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

  // Function for rendering key-value pairs
    const addKeyValue = (type) => {
      return (
        <div style={{ marginBottom: '20px' }}>
          {keyValuePairs[type]?.map((pair, keyIndex) => (
            <div
              key={keyIndex}
              className='box-section'
            >
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
      details: [
        {
          technique_description: [
            {
              description: formatFields(fields.description),
            },
          ],
        },
        {
          mitigation: formatDetails(keyValuePairs.mitigation),
        },
        {
          detection: formatDetails(keyValuePairs.detection),
        },
      ],
      sources: [
        {
          references: formatReferences(keyValuePairs.references),
        },
      ],
    };
    return requestBody;
  };

  const handleSubmit = async () => {
    try {
      let jsonContent = formatJSON();
    let dataMapStorage = localStorage.getItem('techniques');
    dataMapStorage = dataMapStorage ? JSON.parse(dataMapStorage) : [];

    const updatedDataMapStorage = dataMapStorage.map((item) => {
      if (item.name.toLowerCase() === techniqueName.toLowerCase()) {
        return {
          ...item,
          ...jsonContent,
        };
      }
      return item;
    });

    localStorage.setItem('techniques', JSON.stringify(updatedDataMapStorage));

    setResponseSubmit(true)
    setAlertVal('Data saved successfully')
    setTimeout(() => {
      setResponseSubmit(false)
      handleCancelClick()
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
      <section className="collapsible-section">
        <div>
        {showFailAlert && (
            <Alert
              classStyle="alert-fail"
              heading={alertHeading}
              value={alertVal}
            />
          )}
          {requestSubmit && (
            <Alert
              classStyle="alert-success"
              heading={alertHeading}
              value={alertVal}
            />
          )}
          <div
            className={`Collapsible__trigger ${openSections.technique ? 'open' : ''}`}
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
            <div className="collapsible-details">
              <form>
                <div>
                  <label htmlFor="name" style={{ color: 'white', marginRight: '5px' }}>
                    Name:
                  </label>
                  <input type="text" id="name" placeholder="Enter Name" className='key-text' value={techniqueName}
                        onChange={(e) => setTechniqueName(e.target.value)}  disabled={props.technique !== null}  />
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
                        onChange={(e) => setParentTechnique(e.target.value)}  />
                </div>

                {/* Description Section with Box Styling */}
                <div
                  className='box-section'
                >
                  <h4 style={{ color: 'white' }}>Description</h4>
                  {fields.description.map((field, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
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
      <section className="collapsible-section">
        <div>
          <div
            className={`Collapsible__trigger ${openSections.mitigation ? 'open' : ''}`}
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
            <div className="collapsible-details">
              <form>{addKeyValue('mitigation')}</form>
            </div>
          )}
        </div>
      </section>

      {/* Collapsible Detection Section */}
      <section className="collapsible-section">
        <div>
          <div
            className={`Collapsible__trigger ${openSections.detection ? 'open' : ''}`}
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
            <div className="collapsible-details">
              <form>{addKeyValue('detection')}</form>
            </div>
          )}
        </div>
      </section>

      {/* Collapsible References Section */}
      <section className="collapsible-section">
        <div>
          <div
            className={`Collapsible__trigger ${openSections.references ? 'open' : ''}`}
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
            <div className="collapsible-details">
              <form>{addKeyValue('references')}</form>
            </div>
          )}

        </div>
      </section>
      <button className="save-button" type="submit" onClick={handleSubmit}>Submit</button>
      <button className="save-button" type="cancel" onClick={handleCancelClick}>Cancel</button>
    </div>
  );
};

export default ManageContent;
