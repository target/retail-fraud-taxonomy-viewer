import { useState, useEffect } from 'react';
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
  const [editMode, setEditMode] = useState(false);
  const [importContent, setImportContent] = useState(null);
  const [viewCustomContent, setViewCustomContent] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('technique_table')) {
      setViewCustomContent(true)
    }
  }, []);

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

  const handleImportClick = (value) => {
    setImportContent(value);
    setViewCustomContent(true)
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

  const handleEditModeChange = (editStatus) => {
    setEditMode(editStatus);
  };

  const handleViewCustomContent = (viewCustomContentMode) => {
    setViewCustomContent(viewCustomContentMode);
  };

  return (
    <>
      <Header toggleControl={toggleControl} onAddClick={handleAddClick} onEditMode={handleEditModeChange} onImportClick={handleImportClick} onViewCustomContent={handleViewCustomContent}/>
      {!addContent && !editContent && (<TechniquesTable
        onValueClick={handleValueClick}
        onEditClick={handleEditClick}
        onImportClick={handleImportClick}
        searchFilter={filter}
        searchFilterType={filterType}
        isPanelOpen={isSidePanelVisible}
        editStatus={editMode}
        // importStatus={importMode}
        importContent={importContent}
        viewCustomMode={viewCustomContent}
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
          importContent={importContent}
        />
      )}
      {(addContent || editContent) && (
        <ManageContent
          technique={editContent}
          importContent={importContent}
          viewCustomMode={viewCustomContent}
        />
      )}
    </>
  );
};
