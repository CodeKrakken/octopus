import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';


describe('Header', () => {
  const mockHandleAddVoice = jest.fn();
  const mockHandleStartStop = jest.fn();

  const header = (state: Boolean) => (
    <Header
      handleAddVoice={mockHandleAddVoice}
      handleStartStop={mockHandleStartStop}
      showStart={true}
      running={state}
    />
  )

  beforeEach(() => { jest.clearAllMocks(); });

  it('displays correct button text based on running state', () => {
  
    const { rerender } = render(header(false));

    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Stop' })).not.toBeInTheDocument();

    rerender(header(true));

    expect(screen.queryByRole('button', { name: 'Start' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();
  });
});
