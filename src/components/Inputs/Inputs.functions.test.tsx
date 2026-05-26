import { updateField, updateCheckbox } from './Inputs.functions';
import { setUpVoice } from '../Interface/Interface.functions';
import { VoiceType } from '../Voice/Voice.types';
import { Synth } from '../../Synth/Synth';

jest.mock('../../Synth/Synth', () => ({
  Synth: {
    update: jest.fn()
  }
}));

describe('Inputs.functions', () => {
  let voices: VoiceType[];
  let setVoices: jest.Mock;

  beforeEach(() => {
    voices = [setUpVoice(), setUpVoice()];
    voices[0].label = 1;
    voices[0].bpm = 120;
    voices[1].label = 2;
    voices[1].bpm = 100;
    setVoices = jest.fn();
    jest.clearAllMocks();
  });

  describe('updateField', () => {
    // it('updates a numeric field value', () => {
    //   const mockEvent = {
    //     target: { value: '140' }
    //   } as any;

    //   updateField(mockEvent, 'bpm', voices, 0, setVoices);

    //   expect(voices[0].bpm).toBe(140);
    // });

    // it('calls setVoices with updated voices array', () => {
    //   const mockEvent = {
    //     target: { value: '80' }
    //   } as any;

    //   updateField(mockEvent, 'bpm', voices, 0, setVoices);

    //   expect(setVoices).toHaveBeenCalledTimes(1);
    //   expect(setVoices).toHaveBeenCalledWith(expect.any(Array));
    // });

    // it('calls Synth.update with the updated voice and index', () => {
    //   const mockEvent = {
    //     target: { value: '90' }
    //   } as any;

    //   updateField(mockEvent, 'bpm', voices, 0, setVoices);

    //   expect(Synth.update).toHaveBeenCalledWith(voices[0], 0);
    // });

    // it('updates correct voice when index is specified', () => {
    //   const mockEvent = {
    //     target: { value: '150' }
    //   } as any;

    //   updateField(mockEvent, 'bpm', voices, 1, setVoices);

    //   expect(voices[0].bpm).toBe(120);
    //   expect(voices[1].bpm).toBe(150);
    // });

    // it('converts string value to number', () => {
    //   const mockEvent = {
    //     target: { value: '200' }
    //   } as any;

    //   updateField(mockEvent, 'restChance', voices, 0, setVoices);

    //   expect(typeof voices[0].restChance).toBe('number');
    //   expect(voices[0].restChance).toBe(200);
    // });

    // it('handles range field updates (minLevel)', () => {
    //   const mockEvent = {
    //     target: { value: '50' }
    //   } as any;

    //   updateField(mockEvent, 'minLevel', voices, 0, setVoices);

    //   expect(voices[0].minLevel).toBe(50);
    // });

    it('handles range field updates (maxLevel)', () => {
      const mockEvent = {
        target: { value: '99' }
      } as any;

      updateField(mockEvent, 'maxLevel', voices, 0, setVoices);

      expect(voices[0].maxLevel).toBe(99);
    });
  });

  describe('updateCheckbox', () => {
    // it('adds a checkbox value when not checked', () => {
    //   const mockEvent = {
    //     target: { value: 'square' }
    //   } as any;

    //   updateCheckbox(mockEvent, 'activeSounds', voices, 0, setVoices);

    //   expect(voices[0].activeSounds).toContain('square');
    //   expect(voices[0].activeSounds).toContain('sine');
    // });

    // it('removes a checkbox value when already checked', () => {
    //   const mockEvent = {
    //     target: { value: 'sine' }
    //   } as any;

    //   updateCheckbox(mockEvent, 'activeSounds', voices, 0, setVoices);

    //   expect(voices[0].activeSounds).not.toContain('sine');
    //   expect(voices[0].activeSounds.length).toBe(0);
    // });

    // it('calls setVoices after updating checkbox', () => {
    //   const mockEvent = {
    //     target: { value: 'triangle' }
    //   } as any;

    //   updateCheckbox(mockEvent, 'activeSounds', voices, 0, setVoices);

    //   expect(setVoices).toHaveBeenCalledTimes(1);
    //   expect(setVoices).toHaveBeenCalledWith(expect.any(Array));
    // });

    // it('calls Synth.update with the updated voice and index', () => {
    //   const mockEvent = {
    //     target: { value: 'sawtooth' }
    //   } as any;

    //   updateCheckbox(mockEvent, 'activeSounds', voices, 0, setVoices);

    //   expect(Synth.update).toHaveBeenCalledWith(voices[0], 0);
    // });

    // it('updates correct voice when index is specified', () => {
    //   const mockEvent = {
    //     target: { value: 'square' }
    //   } as any;

    //   updateCheckbox(mockEvent, 'activeSounds', voices, 1, setVoices);

    //   expect(voices[0].activeSounds).toEqual(['sine']);
    //   expect(voices[1].activeSounds).toContain('square');
    // });

    // it('handles activeNotes checkbox group', () => {
    //   const mockEvent = {
    //     target: { value: '2' }
    //   } as any;

    //   updateCheckbox(mockEvent, 'activeNotes', voices, 0, setVoices);

    //   expect(voices[0].activeNotes).toContain('2');
    // });

    // it('handles activeOctaves checkbox group', () => {
    //   const mockEvent = {
    //     target: { value: '5' }
    //   } as any;

    //   updateCheckbox(mockEvent, 'activeOctaves', voices, 0, setVoices);

    //   expect(voices[0].activeOctaves).toContain('5');
    // });

    // it('handles activeIntervals checkbox group', () => {
    //   const mockEvent = {
    //     target: { value: '0.5' }
    //   } as any;

    //   updateCheckbox(mockEvent, 'activeIntervals', voices, 0, setVoices);

    //   expect(voices[0].activeIntervals).toContain('0.5');
    // });

    // it('maintains uniqueness of values in array', () => {
    //   const mockEvent1 = {
    //     target: { value: 'square' }
    //   } as any;

    //   updateCheckbox(mockEvent1, 'activeSounds', voices, 0, setVoices);
    //   // After first click, 'square' is added
    //   expect(voices[0].activeSounds).toContain('square');

    //   // Reset the mock before second call
    //   jest.clearAllMocks();
      
    //   // Click the same checkbox again (now it should be checked)
    //   const mockEvent2 = {
    //     target: { value: 'square' }
    //   } as any;

    //   updateCheckbox(mockEvent2, 'activeSounds', voices, 0, setVoices);
    //   // After clicking again, 'square' should be removed (toggled off)
    //   expect(voices[0].activeSounds).not.toContain('square');
    // });

    it('preserves other values when adding a checkbox', () => {
      const mockEvent = {
        target: { value: 'square' }
      } as any;

      updateCheckbox(mockEvent, 'activeSounds', voices, 0, setVoices);

      expect(voices[0].activeSounds).toContain('sine');
      expect(voices[0].activeSounds).toContain('square');
    });

    it('preserves other values when removing a checkbox', () => {
      voices[0].activeSounds = ['sine', 'square', 'triangle'];
      const mockEvent = {
        target: { value: 'square' }
      } as any;

      updateCheckbox(mockEvent, 'activeSounds', voices, 0, setVoices);

      expect(voices[0].activeSounds).toContain('sine');
      expect(voices[0].activeSounds).toContain('triangle');
      expect(voices[0].activeSounds).not.toContain('square');
    });
  });
});
