import { useState, useEffect } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import './CollapsibleSection.css';
import {
  fetchTechniqueDetails,
  fetchTechniqueReferences,
  formatData,
} from '../../utils/dataMap';
import { RiCheckboxBlankFill, RiCheckLine, RiFolderWarningFill } from 'react-icons/ri';

const CollapsibleSection = ({ isPanelOpen, techniqueName, importContent, viewCustomMode }) => {
  const [technique, setTechnique] = useState(techniqueName);
  const [isVisible, setIsVisible] = useState(true);
  const [details, setDetails] = useState(null);
  const [references, setReferences] = useState(null);
  const [openSections, setOpenSections] = useState({ 'Description': true, 'Mitigation': true, 'Detection': true, 'References': true });
  const [openReference, setOpenReferences] = useState(true);

  useEffect(() => {
    setTechnique(techniqueName);
    setIsVisible(true);
    setOpenReferences(true);

  }, [techniqueName]);

  useEffect(() => {
    if (technique) {
      if (viewCustomMode) {
        const fetchedDetails = JSON.parse(localStorage.getItem('techniques')).find(item =>
          item.name === technique
        );
        setDetails(fetchedDetails);
        setReferences(fetchedDetails?.references);
      } else {
        const fetchDetails = async () => {
          const fetchedDetails = await fetchTechniqueDetails(technique, viewCustomMode);
          const fetchedReferences = await fetchTechniqueReferences(technique, viewCustomMode);
          setDetails(fetchedDetails);
          setReferences(fetchedReferences);
        };
        fetchDetails();
      }
    }
  }, [technique, viewCustomMode]);

  useEffect(() => {

    if (importContent) {
      const result = importContent.techniques.filter(tq => tq.name === technique);

      if (result && result.length > 0) {
        setDetails(result[0]);
        setReferences(result[0].references);
      }
    }
  }, [importContent]);

  const handleToggle = (sectionKey) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionKey]: !prevState[sectionKey],
    }));
  };

  const closeContainer = () => {
    setTechnique('');
    setIsVisible(false);
  };

  const show_details = (details, section_header, type) => {
    const isOpen = type === 'details' ? openSections[section_header] : openReference;

    return (
      <section className="collapsible-section">
        <div>
          <div
            className={`Collapsible__trigger ${isPanelOpen ? 'shrink' : ''} ${isOpen ? 'open' : ''}`}
            onClick={() => {
              type === 'details'
                ? handleToggle(section_header)
                : setOpenReferences(!openReference);
            }}
            data-testid="header"
          >
            <h4>{type === 'details' ? section_header : 'References'}</h4>
            {isOpen ? (
              <FaChevronUp className="collapse-icon" />
            ) : (
              <FaChevronDown className="collapse-icon" />
            )}
          </div>

          {isOpen && (
            <div className={`collapsible-details ${isPanelOpen ? 'shrink' : ''}`}>
              {type === 'details'
                ? display_details(details, section_header)
                : display_references(references)}
            </div>
          )}
        </div>
      </section>
    );
  }

   const CustomCheckbox = () => {
      return (
        <div style={{ position: 'relative', width: '10px', height: '10px', top: '-3px' }}>
          {/* Green box */}
          <RiCheckboxBlankFill style={{ color: 'green', fontSize: '20px' }} />
  
          {/* White checkmark */}
          <RiCheckLine
            style={{
              color: 'white',
              position: 'absolute',
              top: '5%',
              left: '0px',
              fontSize: '20px',
            }}
          />
        </div>
      );
    };

  const display_details = (tdetails, section_header) => {
    const urlRegex =
      /https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(?:\/[a-zA-Z0-9-_.~!*'();:@&=+$,/?#[\]]*)*|(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(?:\/[a-zA-Z0-9-_.~!*'();:@&=+$,/?#[\]]*)*/g;
    if (tdetails) {
      return tdetails.map((item, index) => (
        <div key={index}>
          <div key={index + 1}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {item?.type || 'Description'}

                  {item?.type && item.type !== 'Description' && viewCustomMode && item?.implemented &&
                    (section_header === 'Detection' || section_header === 'Mitigation') ? (
                      <CustomCheckbox />
                    ) : (
                      item?.type && item.type !== 'Description' && viewCustomMode && (
                        <RiFolderWarningFill style={{ color: 'orange', fontSize: '20px'}} />
                      )
                    )
                  }
            </h4>


            <ul className="collapsible-details-list">
              {(item?.details == null ? item : item.details)?.map((line, lineIndex) => {
                const matches = [...line.matchAll(urlRegex)];
                if (matches.length > 0) {
                  let lastIndex = 0;
                  let parts = [];
                  matches.forEach((match, i) => {
                    const url = match[0];
                    const start = match.index;
                    if (start > lastIndex) {
                      parts.push(line.slice(lastIndex, start));
                    }
                    const urlToRender = url.startsWith('http')
                      ? url
                      : `https://${url}`;
                    parts.push(
                      <a
                        href={urlToRender}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#0099cc' }}
                        key={`url-${i}`}
                      >
                        {url}
                      </a>,
                    );
                    lastIndex = start + url.length;
                  });
                  if (lastIndex < line.length) {
                    parts.push(line.slice(lastIndex));
                  }
                  return <li key={lineIndex}>{parts}</li>;
                } else {
                  return <li key={lineIndex}>{line}</li>;
                }
              })}
            </ul>
          </div>
        </div>
      ));
    } else {
      return null;
    }
  };

  const display_references = (treferences) => {
    if (treferences) {
      return (
        <ol className="collapsible-details-references">
          {treferences.map((item, index) => {
            return (
              <li key={index}>
                {item['source'] && item['source'].length > 0 ? (
                  <a
                    style={{ color: '#0099cc' }}
                    href={item['source']}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item['name']}
                  </a>
                ) : (
                  <span>{item['name']}</span>
                )}
              </li>
            );
          })}
        </ol>
      );
    } else {
      return null;
    }
  };

  if (!technique || !isVisible) {
    return null;
  }

  return (
    <main>
      <h2 className={`technique-name ${isPanelOpen ? 'shrink' : ''}`}>
        <div className="text">Technique Name: {techniqueName}</div>
        <button
          className="close-icon"
          onClick={closeContainer}
          aria-label="Close"
        >
          <IoMdCloseCircle />
        </button>
      </h2>
      {show_details([details?.technique_description], 'Description', 'details')}
      {show_details(details?.mitigation, 'Mitigation', 'details')}
      {show_details(details?.detection, 'Detection', 'details')}
      {show_details(references, 'References', references)}
    </main>
  );
};

export default CollapsibleSection;
