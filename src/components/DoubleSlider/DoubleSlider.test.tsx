import { fireEvent, render, screen } from "@testing-library/react";
import { VoiceType } from "../Voice/Voice.types";
import DoubleSlider from "./DoubleSlider";

describe('DoubleSlider', () => {
    
    jest.mock('react-range-slider-input', () => ({  
    __esModule: true,  
    default: ({ onInput, ...props }: any) => (  
      <div data-testid="range-slider">  
        <button onClick={() => onInput([20, 60])} data-testid="trigger" />  
      </div>  
    )  
  }));  
    
  it('calls setVoices with updated min/max values', () => {  
    const mockSetVoices = jest.fn();  
    const voices: Partial<VoiceType>[] = [{ minLevel: 10, maxLevel: 50 }];  
    const slider = { label: 'Level', value: 'Level', key: 'level', min: 0, max: 100, row: 1 };  
    
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
      expect.arrayContaining([expect.objectContaining({ minLevel: 20, maxLevel: 60 })])  
    );  
  });
})