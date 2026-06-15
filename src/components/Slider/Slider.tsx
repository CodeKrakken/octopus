import { attributes } from "../../content/data";  
import { InputProps } from "../Input/Input.types";  
import { updateField } from "../Inputs/Inputs.functions";  
import { Atom } from "../shared.types";  
import { VoiceType } from "../Voice/Voice.types";  
import RangeSlider from 'react-range-slider-input';  
import 'react-range-slider-input/dist/style.css';  
  
type SliderProps = {  
  attr: string,  
  i: number,  
  voices: VoiceType[],  
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>,
  defaultValue: [number, number]  
}  
  
export default function Slider ({  
  attr,  
  i,  
  voices,  
  setVoices  
}: SliderProps) {  
  
  const voice = voices[i]  
  const a = attributes[attr as keyof typeof attributes]  
  
  const props: InputProps = {  
    className: 'textbox',  
    'data-voice': i,  
    'data-attribute': `${a.value}`,  
    type: 'number',  
    value: voice[a.value as Atom],  
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateField(e, a.value as Atom, voices, i, setVoices)  
  }  
  
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
      value={rangeValue}  
      onInput={handleRangeInput}  
    /> 
  </div>
}