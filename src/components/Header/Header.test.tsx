import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

jest.mock('../../content/data', () => ({
  title: 'Test Title',
  addLabel: 'Test Add'
}));

describe('Header', () => {
  const mockHandleAddVoice = jest.fn();
  const mockHandleStartStop = jest.fn();

  const renderHeader = (props = {}) => {
    return render(
      <Header
        handleAddVoice={mockHandleAddVoice}
        handleStartStop={mockHandleStartStop}
        showStart={true}
        running={false}
        {...props}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('renders the title from data', () => {
  //   renderHeader();
  //   expect(screen.getByText('Test Title')).toBeInTheDocument();
  // });

  // it('renders add voice button with correct label', () => {
  //   renderHeader();
  //   const addButton = screen.getByRole('button', { name: 'Test Add' });
  //   expect(addButton).toBeInTheDocument();
  // });

  // it('renders start button when showStart is true', () => {
  //   renderHeader({ showStart: true, running: false });
  //   expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();
  // });

  // it('renders stop button when running is true', () => {
  //   renderHeader({ showStart: true, running: true });
  //   expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();
  // });

  // it('does not render start button when showStart is false', () => {
  //   renderHeader({ showStart: false });
  //   expect(screen.queryByRole('button', { name: 'Start' })).not.toBeInTheDocument();
  //   expect(screen.queryByRole('button', { name: 'Stop' })).not.toBeInTheDocument();
  // });

  // it('calls handleAddVoice when add button is clicked', () => {
  //   renderHeader();
  //   const addButton = screen.getByRole('button', { name: 'Test Add' });
  //   fireEvent.click(addButton);
  //   expect(mockHandleAddVoice).toHaveBeenCalledTimes(1);
  // });

  // it('calls handleStartStop when start button is clicked', () => {
  //   renderHeader({ showStart: true, running: false });
  //   const startButton = screen.getByRole('button', { name: 'Start' });
  //   fireEvent.click(startButton);
  //   expect(mockHandleStartStop).toHaveBeenCalledTimes(1);
  // });

  // it('calls handleStartStop when stop button is clicked', () => {
  //   renderHeader({ showStart: true, running: true });
  //   const stopButton = screen.getByRole('button', { name: 'Stop' });
  //   fireEvent.click(stopButton);
  //   expect(mockHandleStartStop).toHaveBeenCalledTimes(1);
  // });

  it('displays correct button text based on running state', () => {
    const { rerender } = render(
      <Header
        handleAddVoice={mockHandleAddVoice}
        handleStartStop={mockHandleStartStop}
        showStart={true}
        running={false}
      />
    );

    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();

    rerender(
      <Header
        handleAddVoice={mockHandleAddVoice}
        handleStartStop={mockHandleStartStop}
        showStart={true}
        running={true}
      />
    );

    expect(screen.queryByRole('button', { name: 'Start' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();
  });

  // it('always renders add voice button regardless of showStart', () => {
  //   renderHeader({ showStart: false });
  //   expect(screen.getByRole('button', { name: 'Test Add' })).toBeInTheDocument();
  // });

  // it('renders title and buttons in correct order', () => {
  //   const { container } = renderHeader({ showStart: true });
  //   const buttons = container.querySelectorAll('button');
  //   expect(buttons.length).toBe(2); // add button + start button
  // });
});
