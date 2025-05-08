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
  const [hide, setHide] = useState(false);
  const [hideTechnique, setHideTechnique] = useState(null);

  const [hideToggleVal, setHideToggleVal] = useState(true);

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
      setHide(false)
    }
  }, [selectedValue]);

  const handleHideClick = useCallback((value) => {
    setHideTechnique(selectedValue)
    setHide(value);
  }, []);

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

  const handleHideToggle = useCallback((hideToggleStatus) => {
    setHideToggleVal(hideToggleStatus);
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
        onHideClick={handleHideClick}
        hideStatus={hide}
        onHideToggle={handleHideToggle}
        hideToggleStatus={hideToggleVal}
      />

      {shouldRenderTechniques && !addContent && !editContent && !hideTechnique && (
        <TechniquesTable
          // key={renderKey}
          onValueClick={handleValueClick}
          onEditClick={handleEditClick}
          onImportClick={handleImportClick}
          searchFilter={filter}
          searchFilterType={filterType}
          isPanelOpen={isSidePanelVisible}
          editStatus={editMode}
          importContent={importContent}
          viewCustomMode={viewCustomContent}
          selectedTechnique={selectedValue}
          hideStatus={hide}
          hideToggleStatus={hideToggleVal}
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
          viewCustomMode={viewCustomContent}
        />
      )}

      {(addContent || editContent) && (
        <ManageContent
          technique={editContent}
          importContent={importContent}
          viewCustomMode={viewCustomContent}
          onViewCustomContent={handleViewCustomContent}
          onBackClick={handleBackClick}
          addContent={addContent}
        />
      )}
    </>
  );
};
