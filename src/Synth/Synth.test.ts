import { Synth } from './Synth';
import { setUpVoice } from '../components/Interface/Interface.functions';
import { VoiceType } from '../components/Voice/Voice.types';

jest.mock('./Synth.functions', () => ({
  firstInterval: jest.fn(),
  getContext: jest.fn(() => ({
    currentTime: 0,
    state: 'running',
    resume: jest.fn()
  })),
  stopOne: jest.fn()
}));

import * as synthFunctions from './Synth.functions';

describe('Synth', () => {
  beforeEach(() => {
    Synth.voices = [];
    jest.clearAllMocks();
  });

  describe('add', () => {
    // it('adds a voice to the voices array', () => {
    //   const voice = setUpVoice();
    //   const runningRef = { current: false };
    //   const voicesRef = { current: [] };

    //   Synth.add(voice, false, runningRef, voicesRef);

    //   expect(Synth.voices).toContain(voice);
    // });

    // it('adds multiple voices', () => {
    //   const voice1 = setUpVoice();
    //   const voice2 = setUpVoice();
    //   const runningRef = { current: false };
    //   const voicesRef = { current: [] };

    //   Synth.add(voice1, false, runningRef, voicesRef);
    //   Synth.add(voice2, false, runningRef, voicesRef);

    //   expect(Synth.voices).toContain(voice1);
    //   expect(Synth.voices).toContain(voice2);
    //   expect(Synth.voices.length).toBe(2);
    // });

    it('calls firstInterval when running is true', () => {
      const voice = setUpVoice();
      const runningRef = { current: true };
      const voicesRef = { current: [voice] };

      Synth.add(voice, true, runningRef, voicesRef);

      expect(synthFunctions.firstInterval).toHaveBeenCalled();
    });

    // it('does not call firstInterval when running is false', () => {
    //   const voice = setUpVoice();
    //   const runningRef = { current: false };
    //   const voicesRef = { current: [voice] };

    //   Synth.add(voice, false, runningRef, voicesRef);

    //   expect(synthFunctions.firstInterval).not.toHaveBeenCalled();
    // });

    // it('calls getContext when adding voice', () => {
    //   const voice = setUpVoice();
    //   const runningRef = { current: false };
    //   const voicesRef = { current: [] };

    //   Synth.add(voice, false, runningRef, voicesRef);

    //   expect(synthFunctions.getContext).toHaveBeenCalled();
    // });
  });

  describe('delete', () => {
    // it('removes a voice from voices array by index', () => {
    //   const voice1 = setUpVoice();
    //   const voice2 = setUpVoice();
    //   Synth.voices = [voice1, voice2];

    //   Synth.delete(0);

    //   expect(Synth.voices).toContain(voice2);
    //   expect(Synth.voices).not.toContain(voice1);
    // });

    // it('handles deleting middle voice', () => {
    //   const voice1 = setUpVoice();
    //   const voice2 = setUpVoice();
    //   const voice3 = setUpVoice();
    //   Synth.voices = [voice1, voice2, voice3];

    //   Synth.delete(1);

    //   expect(Synth.voices).toContain(voice1);
    //   expect(Synth.voices).toContain(voice3);
    //   expect(Synth.voices).not.toContain(voice2);
    //   expect(Synth.voices.length).toBe(2);
    // });

    // it('handles deleting last voice', () => {
    //   const voice1 = setUpVoice();
    //   const voice2 = setUpVoice();
    //   Synth.voices = [voice1, voice2];

    //   Synth.delete(1);

    //   expect(Synth.voices).toContain(voice1);
    //   expect(Synth.voices).not.toContain(voice2);
    //   expect(Synth.voices.length).toBe(1);
    // });

    // it('handles deleting when array becomes empty', () => {
    //   const voice = setUpVoice();
    //   Synth.voices = [voice];

    //   Synth.delete(0);

    //   expect(Synth.voices.length).toBe(0);
    // });

    // it('maintains order of remaining voices', () => {
    //   const voice1 = setUpVoice();
    //   const voice2 = setUpVoice();
    //   const voice3 = setUpVoice();
    //   voice1.label = 1;
    //   voice2.label = 2;
    //   voice3.label = 3;
    //   Synth.voices = [voice1, voice2, voice3];

    //   Synth.delete(1);

    //   expect(Synth.voices[0].label).toBe(1);
    //   expect(Synth.voices[1].label).toBe(3);
    // });
  });

  describe('update', () => {
    // it('updates a voice in the voices array', () => {
    //   const originalVoice = setUpVoice();
    //   const updatedVoice = setUpVoice();
    //   updatedVoice.bpm = 150;
    //   Synth.voices = [originalVoice];

    //   Synth.update(updatedVoice, 0);

    //   expect(Synth.voices[0].bpm).toBe(150);
    // });

    // it('updates voice at correct index', () => {
    //   const voice1 = setUpVoice();
    //   const voice2 = setUpVoice();
    //   const voice3 = setUpVoice();
    //   voice1.label = 1;
    //   voice2.label = 2;
    //   voice3.label = 3;
    //   Synth.voices = [voice1, voice2, voice3];

    //   const updatedVoice2 = setUpVoice();
    //   updatedVoice2.label = 2;
    //   updatedVoice2.bpm = 999;

    //   Synth.update(updatedVoice2, 1);

    //   expect(Synth.voices[1].bpm).toBe(999);
    //   expect(Synth.voices[0].label).toBe(1);
    //   expect(Synth.voices[2].label).toBe(3);
    // });
  });

  

  describe('stop', () => {
    // it('calls stopOne for each voice', () => {
    //   const voice1 = setUpVoice();
    //   const voice2 = setUpVoice();
    //   Synth.voices = [voice1, voice2];

    //   Synth.stop();

    //   expect(synthFunctions.stopOne).toHaveBeenCalledTimes(2);
    // });

    // it('stops all voices', () => {
    //   const voice1 = setUpVoice();
    //   const voice2 = setUpVoice();
    //   voice1.isActive = true;
    //   voice2.isActive = true;
    //   Synth.voices = [voice1, voice2];

    //   Synth.stop();

    //   expect(synthFunctions.stopOne).toHaveBeenCalledWith(voice1);
    //   expect(synthFunctions.stopOne).toHaveBeenCalledWith(voice2);
    // });

    // it('does nothing when no voices', () => {
    //   Synth.voices = [];

    //   Synth.stop();

    //   expect(synthFunctions.stopOne).not.toHaveBeenCalled();
    // });
  });

  describe('voices state', () => {

    // it('maintains voice order', () => {
    //   const voice1 = setUpVoice();
    //   const voice2 = setUpVoice();
    //   const voice3 = setUpVoice();
    //   voice1.label = 1;
    //   voice2.label = 2;
    //   voice3.label = 3;
    //   const runningRef = { current: false };
    //   const voicesRef = { current: [] };

    //   Synth.add(voice1, false, runningRef, voicesRef);
    //   Synth.add(voice2, false, runningRef, voicesRef);
    //   Synth.add(voice3, false, runningRef, voicesRef);

    //   expect(Synth.voices[0].label).toBe(1);
    //   expect(Synth.voices[1].label).toBe(2);
    //   expect(Synth.voices[2].label).toBe(3);
    // });
  });

  describe('integration', () => {
    it('adds, updates, and deletes voices', () => {
      const voice1 = setUpVoice();
      const voice2 = setUpVoice();
      const runningRef = { current: false };
      const voicesRef = { current: [] };

      // Add voices
      Synth.add(voice1, false, runningRef, voicesRef);
      Synth.add(voice2, false, runningRef, voicesRef);
      expect(Synth.voices.length).toBe(2);

      // Update
      voice1.bpm = 200;
      Synth.update(voice1, 0);
      expect(Synth.voices[0].bpm).toBe(200);

      // Delete
      Synth.delete(0);
      expect(Synth.voices.length).toBe(1);
      expect(Synth.voices[0]).toBe(voice2);

      // Stop remaining
      Synth.stop();
      expect(synthFunctions.stopOne).toHaveBeenCalled();
    });
  });
});

// Mock Audio API and data
jest.mock('../content/data', () => ({
  allFrequencies: [
    [32.7, 36.7, 41.2, 43.6, 49.0],    // Octave 0
    [65.4, 73.4, 82.4, 87.3, 98.0],    // Octave 1
    [130.8, 146.8, 164.8, 174.6, 196.0] // Octave 2
  ],
  extrema: ['min', 'max'],
  oneMinute: 60,
  samples: {
    snare: 'test-snare.wav',
    kick: 'test-kick.wav'
  }
}));

import { firstInterval, getContext } from './Synth.functions';  
import { waveforms } from '../content/data';  
  
// Mock dependencies  
jest.mock('./Synth.functions', () => ({  
  firstInterval: jest.fn(),  
  getContext: jest.fn(() => ({ currentTime: 0 })),  
  stopOne: jest.fn(),  
}));  
  
jest.mock('../content/data', () => ({  
  waveforms: ['sine', 'square', 'triangle'],  
}));  
  
describe('Synth.start', () => {  
  beforeEach(() => {  
    jest.clearAllMocks();  
    Synth.voices = [];  
  });  
  
  it('calls firstInterval for each voice with correct arguments', () => {  
    // Arrange  
    const mockVoice1: VoiceType = {  
      bpm: 120,  
      minLevel: 10,  
      maxLevel: 90,  
      activeSounds: ['sine'],  
      activeIntervals: ['1'],  
      activeOctaves: ['4'],  
      activeNotes: ['1'],  
      restChance: 0,  
      minLength: 50,  
      maxLength: 100,  
      minOffset: 0,  
      maxOffset: 0,
      minDetune: 0,
      maxDetune: 0,
      minFadeIn: 0,
      maxFadeIn: 0,
      minFadeOut: 0,
      maxFadeOut: 0,  
      nextInterval: 0,  
      thisInterval: 0,  
      isActive: false,  
      label: 1  
    };  
  
    const mockVoice2: VoiceType = { ...mockVoice1, label: 2 };  
  
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
      
    expect(firstInterval).toHaveBeenCalledWith(  
      mockVoice1,  
      mockContext.currentTime,  
      runningRef,  
      voicesRef,  
      waveforms,  
      mockContext  
    );  
  
    expect(firstInterval).toHaveBeenCalledWith(  
      mockVoice2,  
      mockContext.currentTime,  
      runningRef,  
      voicesRef,  
      waveforms,  
      mockContext  
    );  
  });  
  
  // it('does not call firstInterval when voices array is empty', () => {  
  //   // Arrange  
  //   const runningRef = { current: true };  
  //   const voicesRef = { current: [] };  
  //   const mockContext = { currentTime: 1.5 };  
  
  //   (getContext as jest.Mock).mockReturnValue(mockContext);  
  
  //   // Initialize context by adding then removing a voice  
  //   const tempVoice: VoiceType = {  
  //     bpm: 120,  
  //     minLevel: 10,  
  //     maxLevel: 90,  
  //     activeSounds: ['sine'],  
  //     activeIntervals: ['1'],  
  //     activeOctaves: ['4'],  
  //     activeNotes: ['1'],  
  //     restChance: 0,  
  //     minLength: 50,  
  //     maxLength: 100,  
  //     minOffset: 0,  
  //     maxOffset: 0,
  //     minDetune: 0,
  //     maxDetune: 0,
  //     minFadeIn: 0,
  //     maxFadeIn: 0,
  //     minFadeOut: 0,
  //     maxFadeOut: 0,  
  //     nextInterval: 0,  
  //     thisInterval: 0,  
  //     isActive: false,  
  //     label: 1  
  //   };  
  //   Synth.add(tempVoice, false, runningRef, voicesRef);  
  //   Synth.voices = [];  
  //   (firstInterval as jest.Mock).mockClear();  
  
  //   // Act  
  //   Synth.start(runningRef, voicesRef);  
  
  //   // Assert  
  //   expect(firstInterval).not.toHaveBeenCalled();  
  // });  
});