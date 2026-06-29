import { render, screen, fireEvent }    from '@testing-library/react';
import Inputs                           from './Inputs';
import { updateTextField, updateButton }  from './Inputs.functions';
import { setUpVoice }                   from '../../components/Interface/Interface.functions';
import { VoiceType }                    from '../Voice/Voice.types';


jest.mock('./Inputs.functions', () => ({
  updateTextField: jest.fn(),
  updateButton: jest.fn()
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

  voices[0].bpm = 120

  beforeEach(() => { jest.clearAllMocks();});

  
  it('calls updateTextField when a numeric TextField changes', () => {

    renderInputs();

    fireEvent.change(
      screen.getByDisplayValue('120'), { target: { value: '140'} }
    );

    expect(updateTextField).toHaveBeenCalledTimes(1);

    expect(updateTextField).toHaveBeenCalledWith(
      expect.any(Object),
      'bpm',
      voices,
      0,
      setVoices
    );
  });

  
  it('calls updateButton when a button changes', () => {

    renderInputs();

    fireEvent.click(screen.getByDisplayValue('square'));

    expect(updateButton).toHaveBeenCalledTimes(1);

    expect(updateButton).toHaveBeenCalledWith(
      expect.any(Object),
      'activeSounds',
      voices,
      0,
      setVoices
    );
  });
});