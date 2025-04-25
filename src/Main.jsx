import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header/Header';
import TechniquesTable from './components/TableContent/TechniquesTable';
import CollapsibleSection from './components/Collapsible/CollapsibleSection';
import SidePanel from './components/SidePanelSearch/Panel';
import ManageContent from './components/ContentManager/ManageContent';

export const Main = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [renderKey, setRenderKey] = useState(0);
  const [shouldRenderTechniques, setShouldRenderTechniques] = useState(true);
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState('');
  const [isSidePanelVisible, setIsSidePanelVisible] = useState(false);
  const [editContent, setEditContent] = useState(null);
  const [addContent, setAddContent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [importContent, setImportContent] = useState(null);
  const [viewCustomContent, setViewCustomContent] = useState(false);

  useEffect(() => {
    setViewCustomContent(false);
  }, []);

  const handleBackClick = useCallback(() => {
    setAddContent(null);
    setEditContent(null);
    setViewCustomContent(false);
    setEditMode(false)
    setShouldRenderTechniques(true);
  }, []);

  const handleValueClick = useCallback((value) => {
    if (value === selectedValue) {
      setRenderKey(prevKey => prevKey + 1);
    } else {
      setSelectedValue(value);
    }
  }, [selectedValue]);

  const handleEditClick = useCallback((value) => {
    setEditContent(value);
  }, []);

  const handleAddClick = useCallback((value) => {
    setAddContent(value);
  }, []);

  const handleImportClick = useCallback((value) => {
    setImportContent(value);
    setViewCustomContent(true);
  }, []);

  const handleCloseSidePanel = useCallback(() => {
    setIsSidePanelVisible(false);
  }, []);

  const handleOpenSidePanel = useCallback(() => {
    setIsSidePanelVisible(true);
  }, []);

  const handleFilterChange = useCallback((filterValue, filterType) => {
    setFilter(filterValue);
    setFilterType(filterType);
  }, []);

  const handleEditModeChange = useCallback((editStatus) => {
    setEditMode(editStatus);
  }, []);

  const handleViewCustomContent = useCallback((viewCustomContentMode) => {
    setViewCustomContent(viewCustomContentMode);
  }, []);

  return (
    <>
      <Header
        toggleControl={handleOpenSidePanel}
        onAddClick={handleAddClick}
        onEditMode={handleEditModeChange}
        onImportClick={handleImportClick}
        onViewCustomContent={handleViewCustomContent}
        editStatus={editMode}
        editContent={editContent}
        onBackClick={handleBackClick}
        addContent={addContent}
      />

      {shouldRenderTechniques && !addContent && !editContent && (
        <TechniquesTable
          key={renderKey}
          onValueClick={handleValueClick}
          onEditClick={handleEditClick}
          onImportClick={handleImportClick}
          searchFilter={filter}
          searchFilterType={filterType}
          isPanelOpen={isSidePanelVisible}
          editStatus={editMode}
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
          onViewCustomContent={handleViewCustomContent}
          onBackClick={handleBackClick}
        />
      )}
    </>
  );
};
