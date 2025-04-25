import { useState } from 'react';
import Header from './components/Header/Header';
import TechniquesTable from './components/TableContent/TechniquesTable';
import CollapsibleSection from './components/Collapsible/CollapsibleSection';
import SidePanel from './components/SidePanelSearch/Panel';

export const Main = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [renderKey, setRenderKey] = useState(0);
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState('');
  const [isSidePanelVisible, setIsSidePanelVisible] = useState(false);

  const toggleControl = () => {
    handleOpenSidePanel();
  };

  //Handle ValueClick
  const handleValueClick = (value) => {
    if (value === selectedValue) {
      setRenderKey((prevKey) => prevKey + 1);
    } else {
      setSelectedValue(value);
    }
  };
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
      <Header toggleControl={toggleControl} />
      <TechniquesTable
        onValueClick={handleValueClick}
        searchFilter={filter}
        searchFilterType={filterType}
        isPanelOpen={isSidePanelVisible}
      />
      {isSidePanelVisible && (
        <SidePanel
          onFilterChange={handleFilterChange}
          onClose={handleCloseSidePanel}
        />
      )}
      {selectedValue && (
        <CollapsibleSection
          isPanelOpen={isSidePanelVisible}
          techniqueName={selectedValue}
          key={renderKey}
        />
      )}
    </>
  );
};
