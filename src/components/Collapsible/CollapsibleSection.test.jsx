import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CollapsibleSection from './CollapsibleSection';
import {
  fetchTechniqueDetails,
  fetchTechniqueReferences,
} from '../../utils/dataMap';

vi.mock('../../utils/dataMap', () => ({
  fetchTechniqueDetails: vi.fn(),
  fetchTechniqueReferences: vi.fn(),
  formatData: vi.fn().mockImplementation((inputData) => inputData),
}));

describe('CollapsibleSection', () => {
  beforeEach(() => {
    fetchTechniqueDetails.mockResolvedValue([
      {
        technique_description: [
          {
            description: ['Sample description'],
          },
        ],
      },
    ]);

    fetchTechniqueReferences.mockResolvedValue([
      {
        references: [
          {
            source1: ['https://example.com'],
          },
          {
            source2: [],
          },
        ],
      },
    ]);
  });

  it('should render technique details and references correctly when technique name is passed', async () => {
    render(
      <CollapsibleSection
        isPanelOpen={false}
        techniqueName="Sample Technique"
      />,
    );

    await waitFor(() => {
      expect(fetchTechniqueDetails).toHaveBeenCalledTimes(1);
      expect(fetchTechniqueReferences).toHaveBeenCalledTimes(1);
    });

    expect(
      screen.getByText('Technique Name: Sample Technique'),
    ).toBeInTheDocument();

    await waitFor(() => screen.getByText(/Sample description/i));
    expect(screen.getByText(/Sample description/i)).toBeInTheDocument();
  });

  it('should toggle collapsible section visibility when clicking the section header', async () => {
    render(
      <CollapsibleSection
        isPanelOpen={false}
        techniqueName="Sample Technique"
      />,
    );

    await waitFor(() => {
      expect(fetchTechniqueDetails).toHaveBeenCalledTimes(2);
      expect(fetchTechniqueReferences).toHaveBeenCalledTimes(2);
    });

    const headers = screen.queryAllByTestId('header');
    expect(headers.length).toBe(2);

    const header = headers[0];
    fireEvent.click(header);

    await waitFor(() => {
      expect(screen.getByText('Sample description')).toBeInTheDocument();
    });

    fireEvent.click(header);

    await waitFor(() => {
      expect(screen.queryByText('Sample description')).not.toBeInTheDocument();
    });
  });

  it('should close the container when the close icon is clicked', async () => {
    render(
      <CollapsibleSection
        isPanelOpen={false}
        techniqueName="Sample Technique"
      />,
    );

    const closeIcon = screen.getByLabelText('Close');
    fireEvent.click(closeIcon);

    await waitFor(() => {
      expect(
        screen.queryByText('Technique Name: Sample Technique'),
      ).not.toBeInTheDocument();
    });
  });
});
