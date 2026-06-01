import { Synth } from './Synth';
import { setUpVoice } from '../components/Interface/Interface.functions';
import { VoiceType } from '../components/Voice/Voice.types';
import { firstInterval, getContext, stopOne } from './Synth.functions';  
import { waveforms } from '../content/data';  


jest.mock('./Synth.functions', () => ({  
  firstInterval: jest.fn(),  
  getContext: jest.fn(() => ({ currentTime: 0 })),  
  stopOne: jest.fn(),  
}));  

describe('Synth', () => {
  beforeEach(() => {
    Synth.voices = [];
    jest.clearAllMocks();
  });

  describe('add', () => {

    it('calls firstInterval when running is true', () => {

      const voice = setUpVoice();
      const runningRef = { current: true };
      const voicesRef = { current: [voice] };

      Synth.add(voice, true, runningRef, voicesRef);

      expect(firstInterval).toHaveBeenCalled();
    });
  });

  describe('integration', () => {
    it('adds, updates, and deletes voices', () => {

      const voice1 = setUpVoice();
      const voice2 = setUpVoice();
      const runningRef = { current: false };
      const voicesRef = { current: [] };

      // test add
      Synth.add(voice1, false, runningRef, voicesRef);
      Synth.add(voice2, false, runningRef, voicesRef);
      expect(Synth.voices.length).toBe(2);

      // test update
      voice1.bpm = 200;
      Synth.update(voice1, 0);
      expect(Synth.voices[0].bpm).toBe(200);

      // test delete
      Synth.delete(0);
      expect(Synth.voices.length).toBe(1);
      expect(Synth.voices[0]).toBe(voice2);

      // test stop remaining
      Synth.stop();
      expect(stopOne).toHaveBeenCalled();
    });
  });
});
  
describe('Synth.start', () => {  
  beforeEach(() => {  
    jest.clearAllMocks();  
    Synth.voices = [];  
  });  
  
  it('calls firstInterval for each voice with correct arguments', () => {  

    const mockVoice1: VoiceType = setUpVoice()
    const mockVoice2: VoiceType = setUpVoice(mockVoice1)  
    const runningRef = { current: true };  
    const voicesRef = { current: [mockVoice1, mockVoice2] };  
    const mockContext = { currentTime: 1.5 };  
  
    (getContext as jest.Mock).mockReturnValue(mockContext);  
  
    // Initialize context by calling Synth.add (which calls getContext internally)  
    Synth.add(mockVoice1, false, runningRef, voicesRef);  
    Synth.add(mockVoice2, false, runningRef, voicesRef);  
      
    // Clear the firstInterval calls from add()  
    (firstInterval as jest.Mock).mockClear();  
      
    // Act  
    Synth.start(runningRef, voicesRef);  
  
    // Assert  
    expect(firstInterval).toHaveBeenCalledTimes(2);  

    const args = [ 
      mockContext.currentTime,  
      runningRef,  
      voicesRef,  
      waveforms,  
      mockContext 
    ] 
      
    expect(firstInterval).toHaveBeenCalledWith(mockVoice1, ...args);  
    expect(firstInterval).toHaveBeenCalledWith(mockVoice2, ...args);  
  });  
});