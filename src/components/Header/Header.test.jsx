import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import NRFLogo from '../../content/assets/nrf-logo.svg';

describe('Header', () => {
  it('should render the logo and button correctly', () => {
    render(<Header toggleControl={vi.fn()} />);

    const logo = screen.getByAltText('NRF Logo');
    const button = screen.getByText('Filter By');

    expect(logo).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', NRFLogo);
  });

  it('should call toggleControl with "selection" when button is clicked', () => {
    const toggleControlMock = vi.fn();
    render(<Header toggleControl={toggleControlMock} />);

    const button = screen.getByText('Filter By');
    fireEvent.click(button);

    expect(toggleControlMock).toHaveBeenCalledTimes(1);
    expect(toggleControlMock).toHaveBeenCalledWith('selection');
  });
});
