import { useState, useEffect } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';
import './CollapsibleSection.css';
import {
  fetchTechniqueDetails,
  fetchTechniqueReferences,
  formatData,
} from '../../utils/dataMap';

const CollapsibleSection = ({ isPanelOpen, techniqueName }) => {
  const [technique, setTechnique] = useState(techniqueName);
  const [isVisible, setIsVisible] = useState(true);
  const [details, setDetails] = useState(null);
  const [references, setReferences] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [openReference, setOpenReferences] = useState(true);

  useEffect(() => {
    setTechnique(techniqueName);
    setIsVisible(true);
    setOpenReferences(true);
  }, [techniqueName]);

  useEffect(() => {
    if (technique) {
      const fetchDetails = async () => {
        const fetchedDetails = await fetchTechniqueDetails(technique);
        const fetchedReferences = await fetchTechniqueReferences(technique);
        setDetails(fetchedDetails);
        setReferences(fetchedReferences);
      };

      fetchDetails();
    }
  }, [technique]);

  useEffect(() => {
    if (details) {
      const initialOpenSections = details.reduce((acc, item) => {
          acc[item.section_header] = true;
        return acc;
      }, 
      
      {});
      setOpenSections(initialOpenSections);
    }
  }, [details]);

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

  const show_details = (details, type) => {
    return (
      details &&
      details.map((item, index) => {
        const isOpen = type === 'details' ? openSections[item.section_header] : openReference;
    
        return (
          <section className="collapsible-section" key={index}>
            <div>
              <div
                className={`Collapsible__trigger ${isPanelOpen ? 'shrink' : ''} ${isOpen ? 'open' : ''}`}
                onClick={() => {
                  type === 'details'
                    ? handleToggle(item.section_header)
                    : setOpenReferences(!openReference);
                }}
                data-testid="header"
              >
               <h4>{type === 'details' ? item.section_header : 'References'}</h4>
                {isOpen ? (
                  <FaChevronUp className="collapse-icon" />
                ) : (
                  <FaChevronDown className="collapse-icon" />
                )}
              </div>
    
              {isOpen && (
                <div className={`collapsible-details ${isPanelOpen ? 'shrink' : ''}`}>
                  {type === 'details'
                    ? display_details(item.section_details)
                    : display_references(details[0].references)}
                </div>
              )}
            </div>
          </section>
        );
      })
    );
  }    

  const display_details = (tdetails) => {
    const urlRegex =
      /https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(?:\/[a-zA-Z0-9-_.~!*'();:@&=+$,/?#[\]]*)*|(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+(?:\/[a-zA-Z0-9-_.~!*'();:@&=+$,/?#[\]]*)*/g;
    if (tdetails) {
      return tdetails.map((item, index) => (
        <div key={index}>
            <div key={index+1}>
              <h4>{item.section_sub_header}</h4>
              <ul className="collapsible-details-list">
                {item.section_info.map((line, lineIndex) => {
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
                {item['link'] && item['link'].length > 0 ? (
                  <a
                    style={{ color: '#0099cc' }}
                    href={item['link']}
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
      {show_details(details, 'details')}
      {show_details(references, 'references')}
    </main>
  );
};

export default CollapsibleSection;
