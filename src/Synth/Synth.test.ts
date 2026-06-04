import { Synth } from './Synth';
import { setUpVoice } from '../components/Interface/Interface.functions';
import { VoiceType } from '../components/Voice/Voice.types';
import { firstInterval, getContext, stopOne } from './Synth.functions';
import { waveforms } from '../content/data';
import { createMockContext } from './Synth.test.functions';


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
      const running = true;
      const voicesRef = { current: [voice] };

      Synth.add(voice, running, voicesRef);

      expect(firstInterval).toHaveBeenCalled();
    });
  });


  describe('start', () => {

    it('calls firstInterval for each voice with correct arguments', () => {

      const voice1: VoiceType = setUpVoice()
      const voice2: VoiceType = setUpVoice(voice1)
      const running = false;
      const voicesRef = { current: [voice1, voice2] };
      const mockContext = createMockContext();
      (getContext as jest.Mock).mockReturnValue(mockContext);
      const nextInterval = mockContext.currentTime

      const args = [
        nextInterval,
        running,
        voicesRef,
        waveforms,
        mockContext
      ];

      Synth.add(voice1, running, voicesRef);
      Synth.add(voice2, running, voicesRef);
      Synth.start(running, voicesRef);

      expect(firstInterval).toHaveBeenCalledTimes(2);
      expect(firstInterval).toHaveBeenCalledWith(voice1, ...args);
      expect(firstInterval).toHaveBeenCalledWith(voice2, ...args);
    });
  });


  describe('integration', () => {

    it('adds, updates, and deletes voices', () => {

      const voice1 = setUpVoice();
      const voice2 = setUpVoice();
      const running = false;
      const voicesRef = { current: [] };

      // test add
      Synth.add(voice1, running, voicesRef);
      Synth.add(voice2, running, voicesRef);
      expect(Synth.voices.length).toBe(2);

      // test update
      voice1.bpm = 200;
      Synth.update(voice1, 0);
      expect(Synth.voices[0].bpm).toBe(200);

      // test delete
      Synth.delete(0);
      expect(Synth.voices.length).toBe(1);
      expect(Synth.voices[0]).toBe(voice2);

      // test stop
      Synth.stop();
      expect(stopOne).toHaveBeenCalled();
    });
  });
});
