import { useState } from 'react';
import Header from './components/Header/Header';
import TechniquesTable from './components/TableContent/TechniquesTable';
import CollapsibleSection from './components/Collapsible/CollapsibleSection';
import SidePanel from './components/SidePanelSearch/Panel';
import ManageContent from './components/ContentManager/ManageContent';

export const Main = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [renderKey, setRenderKey] = useState(0);
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState('');
  const [isSidePanelVisible, setIsSidePanelVisible] = useState(false);
  const [editContent, setEditContent] = useState(null);
  const [addContent, setAddContent] = useState(null);

  const toggleControl = () => {
    handleOpenSidePanel();
  };

  const handleValueClick = (value) => {
    if (value === selectedValue) {
      setRenderKey((prevKey) => prevKey + 1);
    } else {
      setSelectedValue(value);
    }
  };

  const handleEditClick = (value) => {
    setEditContent(value)
  }

  const handleAddClick = (value) => {
    setAddContent(value, selectedValue);
  }

  const handleCloseSidePanel = () => {
    setIsSidePanelVisible(false);
  };
  const handleOpenSidePanel = () => {
    setIsSidePanelVisible(true);
  };
  const handleFilterChange = (filterValue, filterType) => {
    setFilter(filterValue);
    setFilterType(filterType);
  };
  return (
    <>
      <Header toggleControl={toggleControl} onAddClick={handleAddClick} />
      {!addContent && !editContent && (<TechniquesTable
        onValueClick={handleValueClick}
        onEditClick={handleEditClick}
        searchFilter={filter}
        searchFilterType={filterType}
        isPanelOpen={isSidePanelVisible}
      />
      )}
      {isSidePanelVisible && (
        <SidePanel
          onFilterChange={handleFilterChange}
          onClose={handleCloseSidePanel}
        />
      )}
      {selectedValue && !addContent && !editContent && (
        <CollapsibleSection
          isPanelOpen={isSidePanelVisible}
          techniqueName={selectedValue}
          key={renderKey}
        />
      )}
      {(addContent || editContent) && (
        <ManageContent
          technique={editContent}
        />
      )}
    </>
  );
};
