import { attributes } from "../../content/data";  
import { Atom } from "../shared.types";  
import { VoiceType } from "../Voice/Voice.types";  
import RangeSlider from 'react-range-slider-input';  
import 'react-range-slider-input/dist/style.css';  
import { useState } from "react";
import "./SingleSlider.css";
  
type SingleSliderProps = {  
  attr: string,  
  i: number,  
  voices: VoiceType[],  
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>,
  thumbsDisabled: [boolean, boolean]
}  
  
export default function SingleSlider ({  
  attr,  
  i,    
  voices,  
  setVoices,
  thumbsDisabled
}: SingleSliderProps) {  
  
  const [val, setVal] = useState(voices[i][attr as Atom]);
  
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
    setVal(values[1])  
  };  
  
  return <div className="slider">    
    <RangeSlider  
      min={0}  
      max={100}  
      value={[0, val]}  
      thumbsDisabled={thumbsDisabled}  
      rangeSlideDisabled={true}  
      onInput={handleRangeInput}  
    />
  </div>
}