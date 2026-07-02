// import { render, screen, fireEvent }    from '@testing-library/react';
// import Inputs                           from './Inputs';
// import { updateTextField, updateButton }  from './Inputs.functions';
// import { setUpVoice }                   from '../../components/Interface/Interface.functions';
// import { VoiceType }                    from '../Voice/Voice.types';


// jest.mock('./Inputs.functions', () => ({
//   updateTextField: jest.fn(),
//   updateButton: jest.fn()
// }));


// describe('Inputs', () => {

//   const setVoices = jest.fn();
//   const voices: VoiceType[] = [setUpVoice()]

//   const renderInputs = () => render(
//     <Inputs
//       i         = {0}
//       voices    = {voices}
//       setVoices = {setVoices}
//     />
//   );

//   voices[0].bpm = 120

//   beforeEach(() => { jest.clearAllMocks();});
  
//   it('calls updateButton when a button changes', () => {

//     renderInputs();

//     fireEvent.click(screen.getByDisplayValue('square'));

//     expect(updateButton).toHaveBeenCalledTimes(1);

//     expect(updateButton).toHaveBeenCalledWith(
//       expect.any(Object),
//       'activeSounds',
//       voices,
//       0,
//       setVoices
//     );
//   });

// import { updateTextField, updateButton } from './Inputs.functions';
// import { setUpVoice } from '../Interface/Interface.functions';
// import { VoiceType } from '../Voice/Voice.types';
// import { ChangeEvent } from 'react';


// describe('Inputs.functions', () => {
//   let voices: VoiceType[];
//   let setVoices: jest.Mock;

//   beforeEach(() => {
//     voices = [setUpVoice(), setUpVoice()];
//     voices[0].label = 1;
//     voices[0].bpm = 120;
//     voices[1].label = 2;
//     voices[1].bpm = 100;
//     setVoices = jest.fn();
//     jest.clearAllMocks();
//   });

//   const createEvent = (value: string) => (
//     { target: { value: value }} as ChangeEvent<HTMLInputElement, Element>
//   )

//   describe('updateButton', () => {
    
//     it('preserves other values when adding a button', () => {

//       const event = createEvent('square')

//       updateButton(event, 'activeSounds', voices, 0, setVoices);

//       expect(voices[0].activeSounds).toContain('sine');
//       expect(voices[0].activeSounds).toContain('square');
//     });

//     it('preserves other values when removing a button', () => {
      
//       voices[0].activeSounds = ['sine', 'square', 'triangle'];
//       const event = createEvent('square')

//       updateButton(event, 'activeSounds', voices, 0, setVoices);

//       expect(voices[0].activeSounds).toContain('sine');
//       expect(voices[0].activeSounds).toContain('triangle');
//       expect(voices[0].activeSounds).not.toContain('square');
//     });
//   });
// });
