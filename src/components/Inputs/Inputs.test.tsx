import { render, screen, fireEvent }    from '@testing-library/react';
import Inputs                           from './Inputs';
import { updateField, updateCheckbox }  from './Inputs.functions';
import { setUpVoice }                   from '../../components/Interface/Interface.functions';
import { VoiceType }                    from '../Voice/Voice.types';


jest.mock('./Inputs.functions', () => ({
  updateField: jest.fn(),
  updateCheckbox: jest.fn()
}));


describe('Inputs', () => {

  const setVoices = jest.fn();

  const voices: VoiceType[] = [setUpVoice()]

  const renderInputs = () => render(
    <Inputs
      i         = {0}
      voices    = {voices}
      setVoices = {setVoices}
    />
  );

  voices[0].bpm       = 120
  voices[0].minLevel  = 10
  voices[0].maxLevel  = 90

  beforeEach(() => { jest.clearAllMocks();});

  it('calls updateField when a numeric field changes', () => {

    renderInputs();

    fireEvent.change(
      screen.getByDisplayValue('120'),
      { target: { value: '140'} }
    );

    expect(updateField).toHaveBeenCalledTimes(1);

    expect(updateField).toHaveBeenCalledWith(
      expect.any(Object),
      'bpm',
      voices,
      0,
      setVoices
    );
  });

  it('calls updateCheckbox when a checkbox changes', () => {

    renderInputs();

    fireEvent.click(
      screen.getByDisplayValue('square')
    );

    expect(updateCheckbox).toHaveBeenCalledTimes(1);

    expect(updateCheckbox).toHaveBeenCalledWith(
      expect.any(Object),
      'activeSounds',
      voices,
      0,
      setVoices
    );
  });

  
});