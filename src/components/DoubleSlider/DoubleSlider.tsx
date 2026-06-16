import { attributes } from "../../content/data";  
import { InputProps } from "../Input/Input.types";  
import { updateField } from "../Inputs/Inputs.functions";  
import { Atom } from "../shared.types";  
import { VoiceType } from "../Voice/Voice.types";  
import RangeSlider from 'react-range-slider-input';  
import 'react-range-slider-input/dist/style.css';  
  
type FieldProps = {  
  fieldName: string,  
  i: number,  
  voices: VoiceType[],  
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>,
  defaultValue: [number, number]  
}  
  
export default function Slider ({  
  fieldName,  
  i,  
  voices,  
  setVoices  
}: FieldProps) {  
  
  const voice = voices[i]  
  const a = attributes[fieldName as keyof typeof attributes]  
    
  const rangeValue = [
    voice[`min${a.value}` as Atom], 
    voice[`max${a.value}` as Atom]
  ] as [number, number]  
    
  const handleRangeInput = (values: [number, number]) => {  
    const updatedVoices = [...voices];  
    updatedVoices[i][`min${a.value}` as Atom] = values[0];  
    updatedVoices[i][`max${a.value}` as Atom] = values[1];  
    setVoices(updatedVoices);  
  };  
  
  return <>  
    <div className="slider">  
      <RangeSlider  
        value={rangeValue}  
        onInput={handleRangeInput}  
      />   
    </div>  
  </>  
}