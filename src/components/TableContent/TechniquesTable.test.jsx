import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TechniquesTable from './TechniquesTable';
import {
  fetchAllTechniques,
  fetchTechnique,
  hasSubTechnique,
  filterDataMap,
} from '../../utils/dataMap';

vi.mock('../../utils/dataMap', () => ({
  fetchAllTechniques: vi.fn(),
  fetchTechnique: vi.fn(),
  hasSubTechnique: vi.fn(),
  filterDataMap: vi.fn(),
}));

describe('TechniquesTable', () => {
  let onValueClick;
  let searchFilter;
  let searchFilterType;
  let isPanelOpen;

  beforeEach(() => {
    onValueClick = vi.fn();
    searchFilter = '';
    searchFilterType = 'Show All';
    isPanelOpen = false;

    fetchAllTechniques.mockResolvedValue([{ tactic1: 'technique1', tactic2: 'technique2' }]);
    fetchTechnique.mockResolvedValue({ sub_techniques: ['Sub-technique 1', 'Sub-technique 2'] });
    hasSubTechnique.mockImplementation(() => true);
  });

  it('should render the table with headers', async () => {
    render(
      <TechniquesTable
        onValueClick={onValueClick}
        searchFilter={searchFilter}
        searchFilterType={searchFilterType}
        isPanelOpen={isPanelOpen}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Tactic1/i)).toBeInTheDocument();
    });

    const headers = await screen.findAllByRole('columnheader');
    expect(headers).toHaveLength(2);
  });

  it('should call onValueClick when a table cell is clicked', async () => {
    render(
      <TechniquesTable
        onValueClick={onValueClick}
        searchFilter={searchFilter}
        searchFilterType={searchFilterType}
        isPanelOpen={isPanelOpen}
      />
    );

    const technique1Cell = await screen.findByText('technique1');
    expect(technique1Cell).toBeInTheDocument();
    fireEvent.click(technique1Cell);

    expect(onValueClick).toHaveBeenCalledWith('technique1');
  });

  it('should show expand icon for a technique with sub-techniques', async () => {
    render(<TechniquesTable />);

    const techniqueRow = await screen.findByText('technique1');
    expect(techniqueRow).toBeInTheDocument();

    const expandIcons = await screen.queryAllByLabelText('expand collapse');
    expect(expandIcons.length).toBeGreaterThan(0);
  });

  it('should handle column collapse and remove empty column', async () => {
    const setTableDataMock = vi.fn();
  
    render(
      <TechniquesTable
        onValueClick={onValueClick}
        searchFilter={searchFilter}
        searchFilterType={searchFilterType}
        isPanelOpen={isPanelOpen}
        setTableData={setTableDataMock}
      />
    );
  
    await waitFor(() => expect(fetchAllTechniques).toHaveBeenCalledTimes(7));
  
    let techniqueRow = await screen.findByText('technique1');
    expect(techniqueRow).toBeInTheDocument();
  
    const expandIcons = await screen.queryAllByLabelText('expand collapse');
    expect(expandIcons.length).toBeGreaterThan(0);
    fireEvent.click(expandIcons[0]);
  
    await waitFor(() => {
      expect(fetchAllTechniques).toHaveBeenCalledTimes(7);
    });
  
    const collapseIcons = await screen.queryAllByLabelText('expand collapse');
    expect(collapseIcons.length).toBeGreaterThan(0);
    fireEvent.click(collapseIcons[0]);
  
    await waitFor(() => {
      expect(fetchAllTechniques).toHaveBeenCalledTimes(7);
    });
  
    const table = screen.getByRole('table');
    const dynamicColumnHeaders = table.querySelectorAll('th');
    const dynamicColumnIndex = Array.from(dynamicColumnHeaders).findIndex(
      (header) => header.textContent.includes('New Column')
    );
    expect(dynamicColumnIndex).toBe(-1);
  });
  

  it('should filter data based on searchFilter', async () => {
    searchFilter = 'technique1';
    filterDataMap.mockReturnValue({ technique: 'technique1' });

    render(
      <TechniquesTable
        onValueClick={onValueClick}
        searchFilter={searchFilter}
        searchFilterType={searchFilterType}
        isPanelOpen={isPanelOpen}
      />
    );

    await waitFor(() => {
      expect(fetchAllTechniques).toHaveBeenCalledTimes(9);
    });

    await waitFor(() => {
      expect(screen.getByText('technique1')).toBeInTheDocument();
    });
  });
});
