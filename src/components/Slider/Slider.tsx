import { attributes } from "../../content/data";  
import { Atom } from "../shared.types";  
import { VoiceType } from "../Voice/Voice.types";  
import RangeSlider from 'react-range-slider-input';  
import 'react-range-slider-input/dist/style.css';  
  
type SliderProps = {  
  attr: string,  
  i: number,  
  voices: VoiceType[],  
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>,
  defaultValue: [number, number],
  thumbsDisabled: [boolean, boolean]
}  
  
export default function Slider ({  
  attr,  
  i,    
  voices,  
  setVoices,
  defaultValue,
  thumbsDisabled}: SliderProps) {  
  
  const voice = voices[i]  
  const a = attributes[attr as keyof typeof attributes]  
    
  const rangeValue = a.inputType === 'rangeSlider'   
    ? [voice[`min${a.value}` as Atom], voice[`max${a.value}` as Atom]] as [number, number]  
    : undefined;  
  
  const handleRangeInput = (values: [number, number]) => {  
    const updatedVoices = [...voices];  
    updatedVoices[i][`min${a.value}` as Atom] = values[0];  
    updatedVoices[i][`max${a.value}` as Atom] = values[1];  
    setVoices(updatedVoices);  
  };  
  
  return <div className="slider">
    <RangeSlider  
      value={defaultValue}  
      onInput={handleRangeInput}
      thumbsDisabled={thumbsDisabled}
    /> 
  </div>
}