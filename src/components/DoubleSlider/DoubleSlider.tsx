import { attributes } from "../../content/data";  
import { Atom } from "../shared.types";  
import { VoiceType } from "../Voice/Voice.types";  
import RangeSlider from 'react-range-slider-input';  
import 'react-range-slider-input/dist/style.css';  
    
export default function DoubleSlider ({  
  attrName,  
  i,  
  voices,  
  setVoices  
}: {  
  attrName: string,  
  i: number,  
  voices: VoiceType[],  
  setVoices: React.Dispatch<React.SetStateAction<VoiceType[]>>,
}) {  
  
  const voice = voices[i]  
  const attr = attributes[attrName as keyof typeof attributes]  
    
  const rangeValue = [
    voice[`min${attr.value}` as Atom], 
    voice[`max${attr.value}` as Atom]
  ] as [number, number]  
    
  const handleRangeInput = (values: [number, number]) => {  
    const updatedVoices = [...voices];  
    updatedVoices[i][`min${attr.value}` as Atom] = values[0];  
    updatedVoices[i][`max${attr.value}` as Atom] = values[1];  
    setVoices(updatedVoices);  
  };  

  const props = {'data-attribute': {attrName}}
  
  return <>  
    <div className="slider">  
      <RangeSlider  
        value={rangeValue}  
        onInput={handleRangeInput}
        {...props}  
      />   
    </div>  
  </>  
}