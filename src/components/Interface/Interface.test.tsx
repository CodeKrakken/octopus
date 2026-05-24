import { render, screen, fireEvent, act } from '@testing-library/react';  
import Interface from './Interface';  
import { Synth } from '../../Synth/Synth';  
  
jest.mock('../../Synth/Synth', () => ({  
  Synth: {  
    add: jest.fn(),  
    delete: jest.fn(),  
    start: jest.fn(),  
    stop: jest.fn(),  
    update: jest.fn(),  
    voices: []  
  }  
}));  
  
jest.mock('../Header/Header', () => ({  
  __esModule: true,  
  default: ({ handleStartStop, running, handleAddVoice, showStart }: any) => (  
    <div>  
      Test Title  
      <button data-testid="add-voice" onClick={handleAddVoice}>Add Voice</button>  
      {showStart && (  
        <button data-testid="start-stop" onClick={handleStartStop}>  
          {running ? 'Stop' : 'Start'}  
        </button>  
      )}  
    </div>  
  )  
}));  
  
jest.mock('../Voice/Voice', () => ({  
  __esModule: true,  
  default: ({ handleDelete, i }: any) => (  
    <div data-voice={i}>  
      <button data-testid={`delete-voice-${i}`} onClick={() => handleDelete(i)}>X</button>  
    </div>  
  )  
}));  
  
describe('Interface', () => {  
  beforeEach(() => {  
    jest.clearAllMocks();  
  });  
  
  it('renders without voices initially', () => {  
    render(<Interface />);  
    expect(screen.getByText('Test Title')).toBeInTheDocument();  
  });  
  
  it('renders header with add voice button', () => {  
    render(<Interface />);  
    expect(screen.getByRole('button', { name: 'Add Voice' })).toBeInTheDocument();  
  });  
  
  it('does not show start button when no voices', () => {  
    render(<Interface />);  
    expect(screen.queryByRole('button', { name: 'Start' })).not.toBeInTheDocument();  
  });  
  
  it('adds a voice when add voice button is clicked', async () => {  
    render(<Interface />);  
    await act(async () => { fireEvent.click(screen.getByTestId('add-voice')); });  
    expect(Synth.add).toHaveBeenCalled();  
  });  
  
  it('calls Synth.add when voice is added', async () => {  
    render(<Interface />);  
    await act(async () => { fireEvent.click(screen.getByTestId('add-voice')); });  
    expect(Synth.add).toHaveBeenCalledWith(  
      expect.any(Object),  
      false,  
      expect.any(Object),  
      expect.any(Object)  
    );  
  });  
  
  it('increments voice label when adding multiple voices', async () => {  
    render(<Interface />);  
    const addButton = screen.getByTestId('add-voice');  
  
    await act(async () => { fireEvent.click(addButton); });  
    const firstVoiceLabel = (Synth.add as jest.Mock).mock.calls[0][0].label;  
  
    jest.clearAllMocks();  
  
    await act(async () => { fireEvent.click(addButton); });  
    const secondVoiceLabel = (Synth.add as jest.Mock).mock.calls[0][0].label;  
  
    expect(secondVoiceLabel).toBe(firstVoiceLabel + 1);  
  });  
  
  it('handles empty voices array gracefully', () => {  
    render(<Interface />);  
    expect(screen.getByText('Test Title')).toBeInTheDocument();  
    expect(screen.queryAllByTestId(/delete-voice/).length).toBe(0);  
  });  
  
  it('integrates with Synth when starting', async () => {  
    render(<Interface />);  
    await act(async () => { fireEvent.click(screen.getByTestId('add-voice')); });  
    expect(Synth.add).toHaveBeenCalledWith(  
      expect.any(Object), false, expect.any(Object), expect.any(Object)  
    );  
  });  
  
  it('manages running state correctly', async () => {  
    render(<Interface />);  
    await act(async () => { fireEvent.click(screen.getByTestId('add-voice')); });  
    expect(Synth.add).toHaveBeenCalledWith(  
      expect.any(Object), false, expect.any(Object), expect.any(Object)  
    );  
  });  
  
  it('renders header with showStart prop based on voices length', async () => {  
    render(<Interface />);  
    expect(screen.queryByRole('button', { name: 'Start' })).not.toBeInTheDocument();  
    await act(async () => { fireEvent.click(screen.getByTestId('add-voice')); });  
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument();  
  });  
  
  it('deletes voice when handleDelete is called', async () => {  
    render(<Interface />);  
    await act(async () => { fireEvent.click(screen.getByTestId('add-voice')); });  
    await act(async () => { fireEvent.click(screen.getByTestId('delete-voice-0')); });  
    expect(Synth.delete).toHaveBeenCalledWith(0);  
  });  
  
  describe('start function (lines 48-49)', () => {  
    it('calls toggleRunning(true) and Synth.start when start is triggered', async () => {  
      render(<Interface />);  
      await act(async () => { fireEvent.click(screen.getByTestId('add-voice')); });  
      const startStopButton = screen.getByTestId('start-stop');  
      await act(async () => { fireEvent.click(startStopButton); });  
      expect(Synth.start).toHaveBeenCalled();  
      expect(startStopButton).toHaveTextContent('Stop');  
    });  
  });  
  
  describe('stopAll function (lines 53-54)', () => {  
    it('calls toggleRunning(false) and Synth.stop when stop is triggered', async () => {  
      render(<Interface />);  
      await act(async () => { fireEvent.click(screen.getByTestId('add-voice')); });  
      const startStopButton = screen.getByTestId('start-stop');  
      await act(async () => { fireEvent.click(startStopButton); });  
      await act(async () => { fireEvent.click(startStopButton); });  
      expect(Synth.stop).toHaveBeenCalled();  
      expect(startStopButton).toHaveTextContent('Start');  
    });  
  });  
});