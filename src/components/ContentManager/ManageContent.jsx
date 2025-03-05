import { useState, useEffect } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import './ManageContent.css';
import { fetchTechnique } from '../../utils/dataMap';
import { transformData, transformKeyValue, transformReference, formatDetails, formatFields, formatReferences } from './ManageContentUtils';
import { RiAddCircleLine, RiDeleteBinLine } from 'react-icons/ri';

const ManageContent = (props) => {
  const [fields, setFields] = useState({
    description: [{ value: '' }],
    tactics: [{ value: '' }],
    schemes: [{ value: '' }],
    sub_techniques: [{ value: '' }],
  });

  // State for key-value pairs for all sections
  const [keyValuePairs, setKeyValuePairs] = useState({
    mitigation: [{ key: '', values: [''] }],
    detection: [{ key: '', values: [''] }],
    references: [{ key: '', values: [''] }],
  });

  // State for toggling collapsible sections
  const [openSections, setOpenSections] = useState({
    technique: true,
    mitigation: true,
    detection: true,
    references: true,
  });

  const [techniqueName, setTechniqueName] = useState(props.technique || '')
  const [code, setCode] = useState('')
  const [parentTechnique, setParentTechnique] = useState('')

  useEffect(() => {
    if (props.technique) {
      const fetchDetails = async () => {
        const techniqueInfo = await fetchTechnique(props.technique)
        
        if(techniqueInfo){
            setCode(techniqueInfo.code)
            setTechniqueName(techniqueInfo.name)
            setParentTechnique(techniqueInfo.parent_technqiue)

            setFields({ description: transformData(techniqueInfo.details[0].technique_description[0].description || ['']),
            tactics: transformData(techniqueInfo.tactics.length == 0 ? [''] : techniqueInfo.tactics),
            schemes: transformData(techniqueInfo.schemes.length == 0 ? [''] : techniqueInfo.schemes),
            sub_techniques: transformData(techniqueInfo.sub_techniques.length == 0 ? [''] : techniqueInfo.sub_techniques),
            })

            setKeyValuePairs({
              mitigation: transformKeyValue(techniqueInfo.details[1].mitigation),
              detection: transformKeyValue(techniqueInfo.details[2].detection),
              references: transformReference(techniqueInfo.sources[0].references),
            })
          }        
      };

      fetchDetails();
    }
  }, [props.technique]);


  // Handle adding a new field
  const addField = (fieldName) => {
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: [...prevFields[fieldName], { value: '' }],
    }));
  };

  // Handle removing a field
  const removeField = (fieldName, index) => {
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: prevFields[fieldName].filter((_, i) => i !== index),
    }));
  };

  // Handle input change for each field
  const handleFieldChange = (fieldName, index, event) => {
    setFields((prevFields) => ({
      ...prevFields,
      [fieldName]: prevFields[fieldName].map((field, i) =>
        i === index ? { ...field, value: event.target.value } : field
      ),
    }));
  };

  // Handle toggling collapsible section
  const handleToggle = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  // Handle adding new key-value pair
  const addKeyValuePair = (type) => {
    setKeyValuePairs((prev) => ({
      ...prev,
      [type]: [...prev[type], { key: '', values: [''] }],
    }));
  };

  // Handle removing key-value pair
  const removeKeyValuePair = (type, index) => {
    setKeyValuePairs((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
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

  const formatJSON = () => {
    let requestBody = {
      "code": code,
      "name": techniqueName,
      "parent_technqiue": parentTechnique,
      "tactics": formatFields(fields.tactics),
      "schemes": formatFields(fields.schemes),
      "sub_techniques": formatFields(fields.sub_techniques),
      "details": [
        {
          "technique_description": [
            {
              "description": formatFields(fields.description)
            }
          ]
        },
        {
          "mitigation": formatDetails(keyValuePairs.mitigation)
        },
        {
          "detection": formatDetails(keyValuePairs.detection)
        }
      ],
      "sources": [
        {
          "references": formatReferences(keyValuePairs.references)
        }
      ]
    }
    return requestBody
  }

  const handleSave = async () => {
    try {
      let filePath = ''

      if(techniqueName && techniqueName?.length > 0){
        filePath = "src/content/techniques/" + techniqueName.toLowerCase().split(' ').join('_') + ".json"
      }

      let jsonContent = formatJSON()
      const dataToSend = {
        filePath: filePath,
        jsonContent: jsonContent
      };

      console.log('dataToSend', JSON.stringify(dataToSend))

      // Make a POST request to the serverless function, passing both the file path and content
      const response = await fetch(`https://target.github.io/retail-fraud-taxonomy-viewer/.netlify/functions/trigger-workflow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("GitHub workflow triggered successfully!");
      } else {
        alert("Failed to trigger workflow");
      }
    } catch (error) {
      console.error("Error triggering workflow:", error);
      alert("An error occurred while triggering the workflow.");
    }
  };

  return (
    <div>
      {/* Collapsible Technique Section */}
      <section className="collapsible-section">
        <div>
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
                        onChange={(e) => setTechniqueName(e.target.value)} />
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
      <button className="save-button" type="submit" onClick={handleSave}>Submit</button>
      <button className="save-button" type="cancel" onClick={handleSave}>Cancel</button>
    </div>
  );
};

export default ManageContent;