import { useEffect, useRef } from "react";
import { attributes } from "../../content/data";  
import { Atom } from "../shared.types";  
import { VoiceType } from "../Voice/Voice.types";  
import RangeSlider, { ReactRangeSliderInputRef } from 'react-range-slider-input';  
import 'react-range-slider-input/dist/style.css';  
import { doubleSliders } from "../../content/data";

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

  const sliderRef = useRef<ReactRangeSliderInputRef>(null);  
  
  useEffect(() => {    
  if (sliderRef.current) {    
    const lowerThumb = sliderRef.current.thumb.lower;  
    const upperThumb = sliderRef.current.thumb.upper;  
      
    if (lowerThumb.hasAttribute('data-lower')) {  
      lowerThumb.dataset.label = String(rangeValue[0]);  
      upperThumb.dataset.label = String(rangeValue[1]);  
    } else {  
      lowerThumb.dataset.label = String(rangeValue[1]);  
      upperThumb.dataset.label = String(rangeValue[0]);  
    }  
  }  
});

  const {min, max} = doubleSliders[attrName as keyof typeof doubleSliders]


  const handleRangeInput = ([lo, hi]: [number, number]) => {    
  if (sliderRef.current) {    
    const lowerThumb = sliderRef.current.thumb.lower;  
    const upperThumb = sliderRef.current.thumb.upper;  
      
    if (lowerThumb.hasAttribute('data-lower')) {  
      lowerThumb.dataset.label = lo.toString();  
      upperThumb.dataset.label = hi.toString();  
    } else {  
      lowerThumb.dataset.label = hi.toString();  
      upperThumb.dataset.label = lo.toString();  
    }  
  }    
    
  const updatedVoices = [...voices];   
    updatedVoices[i][`min${attr.value}` as Atom] = lo;    
    updatedVoices[i][`max${attr.value}` as Atom] = hi;    
    setVoices(updatedVoices);    
  };

  const props = {'data-attribute': {attrName}}
  
  return <>  
    <div className="slider">
      <RangeSlider
        ref={sliderRef}   
        min={min}  
        max={max}    
        value={rangeValue}  
        onInput={handleRangeInput}
        {...props}  
      />   
    </div>  
  </>  
}