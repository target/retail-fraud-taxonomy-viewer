import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Panel from './Panel';
import {
  fetchAllMitigations,
  fetchAllSchemes,
  formatData,
} from '../../utils/dataMap';

vi.mock('../../utils/dataMap', () => ({
  fetchAllMitigations: vi.fn(),
  fetchAllSchemes: vi.fn(),
  formatData: vi.fn(),
}));

describe('Panel', () => {
  let onFilterChange;
  let onClose;

  beforeEach(() => {
    fetchAllMitigations.mockReturnValue(['Mitigation 1', 'Mitigation 2']);
    fetchAllSchemes.mockReturnValue(['Scheme 1', 'Scheme 2']);
    formatData.mockImplementation((value) => value);

    onFilterChange = vi.fn();
    onClose = vi.fn();
  });

  it('should render Panel correctly', () => {
    render(<Panel onFilterChange={onFilterChange} onClose={onClose} />);

    expect(screen.getByText(/Mitigation \(2\)/)).toBeInTheDocument();
    expect(screen.getByText(/Schemes \(2\)/)).toBeInTheDocument();
    expect(screen.getByText('Show All')).toBeInTheDocument();
  });

  it('should display mitigation buttons correctly', () => {
    render(<Panel onFilterChange={onFilterChange} onClose={onClose} />);

    expect(screen.getByText('Mitigation 1')).toBeInTheDocument();
    expect(screen.getByText('Mitigation 2')).toBeInTheDocument();
  });

  it('should display schemes buttons correctly', () => {
    render(<Panel onFilterChange={onFilterChange} onClose={onClose} />);

    expect(screen.getByText('Scheme 1')).toBeInTheDocument();
    expect(screen.getByText('Scheme 2')).toBeInTheDocument();
  });

  it('should call onFilterChange with correct arguments when a mitigation button is hovered over', () => {
    render(<Panel onFilterChange={onFilterChange} onClose={onClose} />);

    fireEvent.click(screen.getByText('Mitigation 1'));

    expect(onFilterChange).toHaveBeenCalledWith('Mitigation 1', 'mitigation');
  });

  it('should call onFilterChange with correct arguments when a scheme button is hovered over', () => {
    render(<Panel onFilterChange={onFilterChange} onClose={onClose} />);

    fireEvent.click(screen.getByText('Scheme 1'));

    expect(onFilterChange).toHaveBeenCalledWith('Scheme 1', 'schemes');
  });

  it('should call onFilterChange with "Show All" when "Show All" button is hovered over', () => {
    render(<Panel onFilterChange={onFilterChange} onClose={onClose} />);

    fireEvent.click(screen.getByText('Show All'));

    expect(onFilterChange).toHaveBeenCalledWith('Show All', 'Show All');
  });

  it('should call onClose when the close icon is clicked', () => {
    render(<Panel onFilterChange={onFilterChange} onClose={onClose} />);

    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
