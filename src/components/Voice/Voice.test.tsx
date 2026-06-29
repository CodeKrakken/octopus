import { render, screen } from '@testing-library/react';
import Voice from './Voice';
import { setUpVoice } from '../Interface/Interface.functions';
import { VoiceType } from './Voice.types';

jest.mock('../../content/data', () => ({
  fields: { bpm: { value: 'bpm' } },
  buttonGroups: {}
}));

describe('Voice', () => {
  const mockHandleDelete = jest.fn();
  const mockSetVoices = jest.fn();

  const voice = (i: number, voices: VoiceType[]) => <Voice
    i={i}
    voices={voices}
    handleDelete={mockHandleDelete}
    setVoices={mockSetVoices}
    dataAttribute="Voices"
  />

  beforeEach(() => { jest.clearAllMocks(); });

  it('handles multiple voices with different indices', () => {
    
    const voices = [setUpVoice(), setUpVoice()];
    
    voices[0].bpm = 100;
    voices[1].bpm = 150;

    render(voice(0, voices));
    render(voice(1, voices));

    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    expect(screen.getByDisplayValue('150')).toBeInTheDocument();
  });
});
