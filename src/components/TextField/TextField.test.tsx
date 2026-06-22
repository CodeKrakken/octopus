import { render, screen, fireEvent } from '@testing-library/react';
import TextField from './TextField';
import { setUpVoice } from '../Interface/Interface.functions';
import { updateTextField } from '../Inputs/Inputs.functions';
import { VoiceType } from '../Voice/Voice.types';

jest.mock('../../content/data', () => ({
  fields: {
    level: {
      value: 'Level',
      input: 'range'
    }
  },
  extrema: ['min', 'max']
}));

jest.mock('../Inputs/Inputs.functions', () => ({
  updateTextField: jest.fn()
}));

describe('TextField', () => {

  const mockSetVoices = jest.fn();
  const voices: VoiceType[] = [setUpVoice()];

  voices[0].maxLevel = 80;

  beforeEach(() => { jest.clearAllMocks(); });
  

  it('calls updateTextField when range max input changes', () => {
    
    render(
      <TextField
        attrName="level"
        i={0}
        voices={voices}
        setVoices={mockSetVoices}
      />
    );

    const maxInput = screen.getByDisplayValue('80');
    
    fireEvent.change(maxInput, { target: { value: '90' } });

    expect(updateTextField).toHaveBeenCalledWith(
      expect.any(Object),
      'maxLevel',
      voices,
      0,
      mockSetVoices
    );
  });
});
