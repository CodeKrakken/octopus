import { fireEvent, render, screen } from "@testing-library/react";  
import { VoiceType } from "../Voice/Voice.types";  
import DoubleSlider from "./DoubleSlider";  
  
// jest.mock() MUST be at the top level, not inside describe()  
jest.mock('../../content/data', () => ({  
  doubleSliders: [],  
}));  
  
jest.mock('react-range-slider-input', () => ({  
  __esModule: true,  
  default: require('react').forwardRef(function MockRangeSlider({ onInput }: any, ref: any) {  
    if (ref) {  
      ref.current = {  
        thumb: {  
          lower: { dataset: {} },  
          upper: { dataset: {} }  
        }  
      };  
    }  
    return require('react').createElement(  
      'div', { 'data-testid': 'range-slider' },  
      require('react').createElement('button', {  
        'data-testid': 'trigger',  
        onClick: () => onInput([20, 60])  
      })  
    );  
  })  
}));
  
describe('DoubleSlider', () => {  
  
  it('calls setVoices with updated min/max values', () => {  
    const mockSetVoices = jest.fn();  
    const voices: Partial<VoiceType>[] = [{ minLevel: 10, maxLevel: 50 }];  
    const slider = { label: 'Level', value: 'Level', attrName: 'level', min: 0, max: 100, row: 1 };  
  
    render(  
      <DoubleSlider  
        slider={slider}  
        i={0}  
        voices={voices as VoiceType[]}  
        setVoices={mockSetVoices}  
      />  
    );  
  
    fireEvent.click(screen.getByTestId('trigger'));  
  
    expect(mockSetVoices).toHaveBeenCalledWith(  
      expect.arrayContaining([  
        expect.objectContaining({ minLevel: 20, maxLevel: 60 })  
      ])  
    );  
  });  
})